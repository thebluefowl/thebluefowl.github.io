<template>
  <ManuscriptShell>
    <Folio page-label="Projects" subtitle="Work, side projects, and other things I've put my name on" />

    <p class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]">
      A loose collection of work, patents, and the occasional small experiment that escaped my laptop.
    </p>

    <SectionHead num="I" title="Work" />
    <ul class="list-none m-0 p-0 flex flex-col gap-9">
      <li v-for="job in work" :key="job.label" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start">
        <div class="flex flex-col gap-1.5">
          <a :href="job.href" class="font-garamond font-semibold text-[28px] leading-none tracking-[-0.01em] m-0 text-black no-underline hover:text-slate-500 transition-colors">{{ job.label }}</a>
          <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">{{ job.years }}</div>
        </div>
        <p class="font-garamond text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch]">{{ job.body }}</p>
      </li>
    </ul>

    <SectionHead num="II" title="Patents" />
    <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li class="flex items-baseline">
        <a href="https://patents.google.com/patent/US20170289354A1/en" target="_blank" rel="noopener" class="font-garamond text-[20px] md:text-[22px] font-medium text-black shrink-0 no-underline hover:text-slate-500 transition-colors">
          Allocation and Management of Shared Virtual Numbers
        </a>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">US20170289354A1, filed March 2017</span>
      </li>
    </ul>

    <SectionHead num="III" title="Open source" />
    <p class="font-garamond text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch]">
      Bits and pieces on
      <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">GitHub</a>.
      Mostly small tools and experiments rather than libraries with users.
    </p>

    <Signoff><em>V.J., Bangalore</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Projects | Vishnu Jayadevan",
  description: "Work, side projects, patents, and open source.",
  ogTitle: "Projects | Vishnu Jayadevan",
  ogDescription: "Work, side projects, patents, and open source.",
});

const work = [
  {
    label: "DeepSource",
    years: "2020 to present",
    href: "https://deepsource.com",
    body: "Code quality and security for fast-moving teams. Helped take it from zero to one. Built the frontend, public API, CLI, reporting, and on-prem deployments. Led product, platform, and security engineering. Now back to IC.",
  },
  {
    label: "Exotel",
    years: "2015 to 2019",
    href: "https://exotel.com",
    body: "Joined at 21. Built internal tooling, then helped build a telephony platform that ended up handling billions of calls.",
  },
];
</script>
