<template>
  <ManuscriptShell>
    <Folio page-label="Projects" subtitle="Work, side projects, and other things I've put my name on" />

    <p
      v-if="page?.lede"
      class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]"
      v-html="useInlineMd(page.lede)"
    ></p>

    <SectionHead num="I" title="Work" />
    <ul class="list-none m-0 p-0 flex flex-col gap-9">
      <li v-for="job in page?.work" :key="job.label" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start">
        <div class="flex flex-col gap-1.5">
          <a :href="job.href" class="font-garamond font-semibold text-[28px] leading-none tracking-[-0.01em] m-0 text-black no-underline hover:text-slate-500 transition-colors">{{ job.label }}</a>
          <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">{{ job.years }}</div>
        </div>
        <p class="font-garamond text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch] whitespace-pre-line">{{ job.body.trim() }}</p>
      </li>
    </ul>

    <SectionHead num="II" title="Patents" />
    <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li v-for="p in page?.patents" :key="p.title" class="flex items-baseline">
        <a :href="p.href" target="_blank" rel="noopener" class="font-garamond text-[20px] md:text-[22px] font-medium text-black shrink-0 no-underline hover:text-slate-500 transition-colors">
          {{ p.title }}
        </a>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">{{ p.meta }}</span>
      </li>
    </ul>

    <SectionHead num="III" title="Open source" />
    <p
      v-if="page?.opensource?.body"
      class="font-garamond text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch]"
      v-html="useInlineMd(page.opensource.body)"
    ></p>

    <Signoff><em>V.J., Bangalore</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: page } = await useAsyncData("projects-page", () =>
  queryContent("/projects").findOne()
);

useSeoMeta({
  title: () => `${page.value?.title ?? "Projects"} | Vishnu Jayadevan`,
  description: () => page.value?.description ?? "Work, side projects, patents, and open source.",
  ogTitle: () => `${page.value?.title ?? "Projects"} | Vishnu Jayadevan`,
  ogDescription: () => page.value?.description ?? "Work, side projects, patents, and open source.",
});

</script>
