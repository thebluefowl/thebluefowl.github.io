<template>
  <ManuscriptShell>
    <Folio page-label="Now" subtitle="What I'm up to, this month" />

    <div class="flex items-center gap-4 mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">
      <span>Bangalore</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <span>Updated {{ updated }}</span>
    </div>

    <p class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch] mt-7">
      A snapshot of the present tense. Inspired by
      <a href="https://nownownow.com/about" target="_blank" rel="noopener" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">Derek Sivers'</a>
      /now page. What I'd tell a friend I bumped into on the street, if they asked what I'd been up to.
    </p>

    <SectionHead num="I" title="Currently" />
    <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li v-for="row in currently" :key="row.k" class="flex items-baseline">
        <span class="font-garamond text-[24px] font-medium text-black no-underline shrink-0">{{ row.k }}</span>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-garamond text-[18px] text-gray-800 text-right shrink-0" v-html="row.v"></span>
      </li>
    </ul>

    <SectionHead num="II">
      This <em class="italic font-normal">week</em>
    </SectionHead>
    <p class="font-garamond text-[18px] md:text-[19px] leading-[1.55] text-gray-800 m-0 max-w-[62ch]">
      Mostly heads-down on a scheduler rewrite, figuring out how to make work distribution stable
      when nodes come and go. Some afternoons spent rereading the Raft paper. The monsoon's late
      this year, and the tank water is the wrong shade of green; both of those are getting more
      attention than they deserve.
    </p>

    <SectionHead num="III" title="Recently" />
    <ol class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li v-for="row in recently" :key="row.d" class="flex items-baseline">
        <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 w-16 shrink-0">{{ row.d }}</span>
        <span class="font-garamond italic font-medium text-[19px] text-black shrink-0">{{ row.k }}</span>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-garamond italic text-[16px] text-gray-600 shrink-0" v-html="row.v"></span>
      </li>
    </ol>

    <Signoff><em>refreshed roughly once a month</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Now | Vishnu Jayadevan",
  description: "What I'm up to right now: work, writing, reading, and life outside the keyboard.",
  ogTitle: "Now | Vishnu Jayadevan",
  ogDescription: "What I'm up to right now.",
});

const updated = "24 April 2026";

const currently = [
  { k: "Working on", v: "Distributed scheduling at DeepSource" },
  { k: "Reading", v: "<em>Eurotrash</em> by Christian Kracht" },
  { k: "Writing", v: "A long post on jump consistent hashing" },
  { k: "Listening to", v: "Khruangbin, Brian Eno, Carnatic instrumentals" },
  { k: "Tinkering with", v: "A 60-litre planted tank. Algae winning again" },
  { k: "Living in", v: "Bangalore, Indiranagar mostly" },
];

const recently = [
  { d: "Apr 22", k: "Shipped", v: "v0.18 of the CLI. Incremental scans across monorepos." },
  { d: "Apr 18", k: "Wrote", v: "Notes on jump hash, pinned to the front page." },
  { d: "Apr 11", k: "Finished", v: "<em>The Covenant of Water</em>. A long, slow read." },
  { d: "Apr 04", k: "Visited", v: "Hosur Junction. Three hours of trains and filter coffee." },
  { d: "Mar 28", k: "Replanted", v: "The 60-litre tank. Cryptocoryne, Anubias, and patience." },
];
</script>
