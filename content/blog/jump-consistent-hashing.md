---
title: "Jump Hash: A Rigged Coin Toss That Actually Works"
description: "How jump consistent hashing minimizes remapping when scaling cache nodes, and why the math works"
cover: "/images/about.jpg"
category: "Software Engineering"
date: "2026-04-09"
---

## The problem

You have N cache nodes and a bunch of keys. You need to decide which node handles which key. The obvious approach:
`node = hash(key) % N`. This works great until you scale. Go from 3 pods to 4, and `hash % 3` vs `hash % 4` gives a completely different answer for almost every key. ~75% of your keys get remapped to a different node. Every remapped key is a cache miss. The new node has to fetch the data from scratch.

Jump consistent hashing solves this. When you go from 3 pods to 4, only ~25% of keys move (1/N). The rest stay put.

## Think of it as a game

Forget code for a moment. You have a key (say, "repo-A") and 3 buckets. You're going to walk through buckets 0, 1, 2 and decide where to put the key.

**Rule:** At each bucket, flip a coin. Heads = move here. Tails = stay where you are.

But the coin is rigged. It gets harder to flip heads as you go:

```
Bucket 0:  100% chance you move here  (you have to start somewhere)
Bucket 1:  50% chance you move here   (1/2)
Bucket 2:  33% chance you move here   (1/3)
Bucket 3:  25% chance you move here   (1/4)
...
Bucket N:  1/N chance
```

Your final answer is the **last bucket you moved to**.

### Example with 3 buckets

```
repo-A walks through:

Bucket 0: must move here      -> current answer: 0
Bucket 1: flip -> tails (stay) -> current answer: 0
Bucket 2: flip -> heads (move) -> current answer: 2

Final answer: bucket 2
```

### Now add a 4th bucket

repo-A walks through **the exact same flips** for buckets 0-2 (same key = same coin = same results), then gets one more flip:

```
Bucket 0: must move here       -> 0  (same as before)
Bucket 1: flip -> tails        -> 0  (same as before)
Bucket 2: flip -> heads        -> 2  (same as before)
Bucket 3: flip -> tails (stay) -> 2  <- only new decision

Final answer: still bucket 2
```

repo-A didn't move. It only would have moved if that one extra flip for bucket 3 came up heads, which is a 1/4 chance.

### That's the whole insight

Every key's path through buckets 0..N-1 is **frozen by its coin sequence**. Adding bucket N only adds one more flip at the end. Only keys that flip heads on that one extra flip move. That's 1/N of them.

With mod-N (`hash % 3` vs `hash % 4`), the entire calculation changes. It's not adding a flip at the end, it's redoing all the math from scratch. So almost everything shuffles.

## The slow version

The game above translates directly to code:

```
place the key at bucket 0

for each bucket i from 1 to N-1:
    generate a random number r between 0 and 1  (seeded by the key, so deterministic)
    if r < 1/i:
        move the key to bucket i

return wherever the key ended up
```

That's it. For each bucket, roll the dice. Move or stay. The decreasing probability (1/2, 1/3, 1/4...) is what makes the math work.

### Why that's slow

If you have 1000 nodes, you loop 1000 times. Most of those iterations are "stay", especially the later ones where the probability is tiny. You're doing a lot of work to say "nothing happened."

## The fast version

Instead of asking each bucket one at a time, ask:

> "I'm at bucket `b`. Given the probabilities 1/(b+1), 1/(b+2), 1/(b+3)..., **which is the next bucket where I'd flip heads?**"

There's a closed-form answer. If you're at bucket `b` and your next random number is `r`:

```
next bucket where you'd move = floor((b + 1) / r)
```

### Trace through it

```
N = 6 nodes, some key

b = 0          I'm at bucket 0
               Random says next heads is at bucket 3
               Jump straight to 3, skip 1 and 2

b = 3          I'm at bucket 3
               Random says next heads is at bucket 9
               9 >= N, so I'm done

return 3
```

Two iterations instead of six. For 1000 nodes you'd do ~7 iterations (ln 1000) instead of 1000.

Both versions give the same answer. The fast version doesn't change the probabilities. It just batches all the "tails" flips into one jump.

## Where does the reducing probability hide?

In the jump distance. Watch:

```
If I'm at b = 0:
  r = 0.5  -> j = 1/0.5 = 2   (jump to bucket 2)
  r = 0.9  -> j = 1/0.9 = 1   (jump to bucket 1)
  r = 0.1  -> j = 1/0.1 = 10  (jump to bucket 10)

If I'm at b = 5:
  r = 0.5  -> j = 6/0.5 = 12  (jump to bucket 12)
  r = 0.9  -> j = 6/0.9 = 6   (jump to bucket 6)
  r = 0.1  -> j = 6/0.1 = 60  (jump to bucket 60)
```

The further along you are (bigger `b`), the **bigger the jumps**. At `b = 0`, a random `r` might land you 1-2 buckets ahead. At `b = 100`, the same `r` lands you 10-20 buckets ahead. The jumps get longer because the probability of moving to any individual bucket gets smaller.

That's the reducing probability. It's not a separate `if r < 1/i` check. It's the same math expressed as "how far do I jump?" instead of "do I move here?"

## The actual code

The entire algorithm is ~10 lines of Go:

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

Breaking it down:

- `b` is your current bucket (the answer so far)
- `j` is the next candidate bucket to jump to
- `key = key * 2862933555777941757 + 1` advances a PRNG (linear congruential generator) to get the next "coin flip". The big number is Knuth's multiplier, chosen because it spreads sequential inputs evenly across 64-bit space
- `(key>>33) + 1` extracts a random number from the upper bits
- `(b+1) * 2^31 / ((key>>33)+1)` is the `floor((b+1) / r)` formula, just expressed in integer arithmetic
- When `j >= numBuckets`, the loop exits and `b` is the answer

## The comparison

|                     | `hash % N` | Jump hash  |
| ------------------- | ---------- | ---------- |
| **3 to 4 nodes**    | ~75% remap | ~25% remap |
| **5 to 4 nodes**    | ~80% remap | ~20% remap |
| **Same node count** | 0% remap   | 0% remap   |
| **Time complexity** | O(1)       | O(ln N)    |
| **Space**           | O(1)       | O(1)       |

## The trade-off

Jump hash only supports appending/removing the **last** bucket. You can't remove an arbitrary bucket from the middle. But if your nodes are numbered 0..N-1 and you always add/remove from the end, it's a natural fit.

## Further reading

- [Lamping & Veach, "A Fast, Minimal Memory, Consistent Hash Algorithm" (2014)](https://arxiv.org/abs/1406.2294), the original paper, 5 pages
