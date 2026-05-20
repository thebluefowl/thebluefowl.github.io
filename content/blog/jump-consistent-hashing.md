---
title: "Jump consistent hashing: consistent hashing without the ring."
description: "When you need to spread keys across a cluster and can't afford a full ring, jump consistent hashing gives you optimal redistribution in ten lines of code, zero memory, and O(ln N) lookups."
category: "Software Engineering"
date: "2026-04-09"
---

We needed to distribute cached source code blobs across multiple nodes without hitting remote repositories on every request. The proxy was the easy part. The harder question: how do you decide which node owns which key, and what happens when the number of nodes changes?  The obvious answer is `hash(key) % N`. It works. But it falls apart the moment you scale.

## The problem with modular hashing

You have $N$ nodes and a pile of keys. `hash(key) % N` assigns each key to a node. Clean, stateless, $O(1)$.

Then you go from 3 nodes to 4. `hash % 3` and `hash % 4` produce completely different assignments for most keys. Roughly 75% of your keys land on a different node. Every one of those is a cache miss. The new node has to re-fetch everything from scratch.

This is the redistribution problem. The ideal behavior when adding a fourth node is that only $\frac{1}{4}$ of keys move, just enough to give the new node its fair share. Modular hashing can't do that because the entire calculation changes when $N$ changes.

Consistent hashing algorithms solve this. The classic approach uses a ring with virtual nodes. It works, but it requires a data structure, $O(\log N)$ lookups, and careful tuning of virtual node counts for load balance.

Jump consistent hashing gets the same redistribution guarantee with zero memory, $O(\ln N)$ lookups, and about ten lines of code.

## The idea

Imagine walking through buckets one at a time and flipping a coin at each one to decide whether a key moves there. But the coin is rigged: it gets harder to flip heads the further along you go.

```
Bucket 0: 100% chance you move here (you have to start somewhere)
Bucket 1: 50% chance you move here
Bucket 2: 33% chance you move here
Bucket 3: 25% chance you move here
...
Bucket k: $\frac{1}{k+1}$ chance you move here
```

Your final answer is the last bucket you moved to.

Here's the critical detail: the coin flips are deterministic. The same key always produces the same sequence of flips. So when you add a fourth bucket, the first three flips don't change. You just get one more flip at the end. The only keys that move are the ones that flip heads on that one new flip, which is $\frac{1}{4}$ of them.

That's the entire insight. Every key's path through the buckets is frozen by its random sequence. Adding a bucket appends one flip. Removing the last bucket removes one flip. Nothing else changes.

## The slow version

The coin-flipping game translates directly to code:

```
place the key at bucket 0

for each bucket i from 1 to N-1:
    generate a pseudorandom number r in [0, 1), seeded by the key
    if r < 1/(i+1):
        move the key to bucket i

return wherever the key ended up
```

This is correct but slow. You loop through every bucket even though most flips past the first few will be tails. At bucket 500, the chance of moving is $\frac{1}{501}$, so you're burning a random number generation to almost certainly do nothing.

## The math that makes it fast

We want to skip ahead. Instead of asking "does the key move to this bucket?" at every step, we want to ask "what's the next bucket this key moves to?" and jump straight there.

### The survival probability

Say the key is currently at bucket $b$. There are $b + 1$ total buckets (numbered $0$ through $b$). Now buckets get added one at a time. At each step, the key either stays at $b$ or moves to the new bucket.

When the total grows from $n$ to $n + 1$, every key has a $\frac{1}{n+1}$ chance of moving to the new bucket, so a $\frac{n}{n+1}$ chance of staying put. That's just the fairness requirement: the new bucket needs $\frac{1}{n+1}$ of all keys, and since every existing key is equally likely to be the one that moves, each key independently stays with probability $\frac{n}{n+1}$.

Now chain these together. The probability the key stays at $b$ through all the transitions up to $j$ total buckets is the product of each transition's survival probability:

$$P(\text{still at } b \text{ with } j \text{ buckets}) = \prod_{n=b+1}^{j-1} \frac{n}{n+1}$$

Written out:

$$= \frac{b+1}{b+2} \cdot \frac{b+2}{b+3} \cdot \frac{b+3}{b+4} \cdots \frac{j-1}{j}$$

Each factor is one transition. The first is when the total grows from $b+1$ to $b+2$, where the key stays with probability $\frac{b+1}{b+2}$. The next is from $b+2$ to $b+3$, with stay probability $\frac{b+2}{b+3}$. And so on.

### The telescoping trick

Look at that product again. The numerator of each fraction cancels the denominator of the previous one. The $(b+2)$ on top cancels the $(b+2)$ on the bottom. The $(b+3)$ cancels. Everything in the middle vanishes:

$$\frac{\cancel{b+1}}{\cancel{b+2}} \cdot \frac{\cancel{b+2}}{\cancel{b+3}} \cdot \frac{\cancel{b+3}}{\cancel{b+4}} \cdots \frac{j-1}{j} = \frac{b+1}{j}$$

So:

$$P(\text{still at } b \text{ with } j \text{ buckets}) = \frac{b+1}{j}$$

The entire chain of survival probabilities collapses to one fraction. The intermediate steps don't matter.

### Inverting it

We now have: the probability the key is still at $b$ after $j$ total buckets is $\frac{b+1}{j}$. We want to find the next bucket the key jumps to.

Draw a random number $r \sim \text{Uniform}(0, 1]$. The key stays at $b$ as long as the survival probability is at least $r$:

$$\frac{b+1}{j} \geq r$$

Rearranging:

$$j \leq \frac{b+1}{r}$$

So the largest $j$ where the key is still at $b$ is $\left\lfloor \frac{b+1}{r} \right\rfloor$. That's where the key jumps to:

$$j_{\text{next}} = \left\lfloor \frac{b+1}{r} \right\rfloor, \quad r \sim \text{Uniform}(0, 1]$$

### Why this is $O(\ln N)$

Each jump roughly doubles your position on average (since the median of $\frac{1}{r}$ for uniform $r$ is 2). Starting from bucket 0, you reach bucket $N$ in about $\ln N$ jumps. For 1,000 nodes, that's about 7 iterations instead of 1,000.

## Where does the shrinking probability hide?

In the jump distance. Watch what happens with different starting positions:

```
At b = 0,  r = 0.5:  j = floor(1/0.5)  = 2   (jump 2 buckets)
At b = 0,  r = 0.9:  j = floor(1/0.9)  = 1   (jump 1 bucket)
At b = 5,  r = 0.5:  j = floor(6/0.5)  = 12  (jump 7 buckets)
At b = 5,  r = 0.9:  j = floor(6/0.9)  = 6   (jump 1 bucket)
At b = 100, r = 0.5: j = floor(101/0.5) = 202 (jump 102 buckets)
```

The further along you are, the bigger the jumps. That's the decreasing $\frac{1}{k}$ probability expressed geometrically: when each individual bucket is unlikely to be "the one", you skip over more of them at once.

## The code

The entire algorithm in Go:

```go
func jumpHash(key uint64, numBuckets int) int {
    var b, j int64 = -1, 0
    for j < int64(numBuckets) {
        b = j
        key = key*2862933555777941757 + 1
        j = int64(float64(b+1) * (float64(int64(1)<<31) / float64((key>>33)+1)))
    }
    return int(b)
}
```

Walking through it:

- `b` tracks the current bucket (the answer so far). `j` is the next candidate.
- `key = key * 2862933555777941757 + 1` advances a linear congruential generator. The magic number is Knuth's multiplier, chosen because it spreads sequential inputs evenly across 64-bit space.
- `(key >> 33) + 1` extracts the upper bits as a pseudorandom value.
- The expression `(b+1) * 2^31 / ((key>>33)+1)` is just $\left\lfloor \frac{b+1}{r} \right\rfloor$ done in integer arithmetic, where $r$ comes from the PRNG.
- When `j` overshoots `numBuckets`, the loop stops and `b` is the final answer.

Starting `b` at -1 and `j` at 0 handles the base case: the first iteration always sets `b = 0`, placing the key in bucket 0 before any jumps happen.

## The comparison

|                     | `hash % N` | Jump hash  |
|---------------------|------------|------------|
| 3 → 4 nodes         | ~75% remap | ~25% remap |
| 5 → 4 nodes         | ~80% remap | ~20% remap |
| Same node count     | 0% remap   | 0% remap   |
| Time complexity     | $O(1)$       | $O(\ln N)$    |
| Space               | $O(1)$       | $O(1)$       |

## The trade-off

Jump hash only supports adding or removing the last bucket. You can't yank an arbitrary node from the middle of the sequence. If node 3 out of 10 dies, you can't just say "9 buckets now" because that renumbers everything after it.

This is fine if your nodes are a numbered pod set that scales by appending (a Kubernetes StatefulSet, a cache pool with a replica count). It's not fine if any node can fail independently and needs to be drained without disrupting the rest.

## Jump hash vs ring hashing

Ring-based consistent hashing (Karger et al., 1997) solves the same redistribution problem with a sorted ring of virtual nodes. Both move roughly $\frac{1}{N}$ keys when resizing. They differ in everything else.

|                         | Ring + vnodes              | Jump hash         |
|-------------------------|----------------------------|-------------------|
| Remap on resize         | $\sim\frac{1}{N}$                       | $\sim\frac{1}{N}$              |
| Lookup                  | $O(\log(N \cdot V))$ binary search| $O(\ln N)$           |
| Memory                  | $O(N \cdot V)$ sorted ring       | $O(1)$              |
| Remove arbitrary node   | Yes                        | No, last only     |
| Weighted nodes          | Easy (more vnodes)         | Needs a wrapper   |
| Replica fallback        | Walk the ring clockwise    | Extra logic       |
| Load variance           | Depends on V               | Provably uniform  |

`V` is virtual nodes per physical node, typically 100 to 200 for acceptable load balance.

### Reach for jump hash when

- Your nodes are numbered 0 through N-1 and you scale by appending or trimming from the end. A stateless worker pool behind a load balancer. A cache pod set you grow by bumping a replica count.
- Every node carries equal load. No "this box is beefier, give it 2x."
- One node per key is enough. No replica sets, no "if A is down try B."
- You want zero state. The function is the data structure. Nothing to gossip, nothing to keep in sync across clients.

### Reach for ring hashing when

- You need to drain a specific node without renumbering everything after it.
- You need N-way replication with predictable placement. Walking the ring clockwise gives you the next N-1 nodes for free. This is the backbone of Cassandra, Riak, and DynamoDB-style replication.
- You need weighted nodes. Bigger machines get more virtual nodes and proportionally more traffic.
- Your nodes have names, not numbers. Service discovery hands you `shard-bom-3`, not the integer 5.

When jump hash fits, it's strictly better: smaller, faster, zero state, provably uniform. But the constraints rule it out for a lot of production systems. Stateful databases with replication, heterogeneous fleets, and clusters where any node can fail are ring territory. Stateless shard pools you scale up and down by one are jump territory.

## Further reading

- [Lamping & Veach, "A Fast, Minimal Memory, Consistent Hash Algorithm" (2014)](https://arxiv.org/abs/1406.2294), the original paper, 5 pages.