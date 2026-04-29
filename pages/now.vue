<template>
  <ManuscriptShell>
    <Folio page-label="Now" subtitle="What I'm up to, this month" />

    <div class="flex items-center gap-4 mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">
      <span>{{ now?.location }}</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <span>Updated {{ now?.updated }}</span>
    </div>

    <div
      v-if="now?.lede"
      class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch] mt-7 lede-prose"
      v-html="ledeHtml"
    ></div>

    <SectionHead num="I" title="Currently" />
    <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li v-for="row in now?.currently" :key="row.k" class="flex items-baseline">
        <span class="font-garamond text-[24px] font-medium text-black no-underline shrink-0">{{ row.k }}</span>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-garamond text-[18px] text-gray-800 text-right shrink-0" v-html="row.v"></span>
      </li>
    </ul>

    <SectionHead num="II">
      This <em class="italic font-normal">week</em>
    </SectionHead>
    <div class="font-garamond text-[18px] md:text-[19px] leading-[1.55] text-gray-800 m-0 max-w-[62ch] week-prose">
      <ContentRenderer v-if="now" :value="now" />
    </div>

    <SectionHead num="III" title="Recently" />
    <ol class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li v-for="row in now?.recently" :key="row.d" class="flex items-baseline">
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

const { data: now } = await useAsyncData("now-page", () =>
  queryContent("/now").findOne()
);

useSeoMeta({
  title: () => `${now.value?.title ?? "Now"} | Vishnu Jayadevan`,
  description: () => now.value?.description ?? "What I'm up to right now.",
  ogTitle: () => `${now.value?.title ?? "Now"} | Vishnu Jayadevan`,
  ogDescription: () => now.value?.description ?? "What I'm up to right now.",
});

// Render the lede markdown (links etc.) into HTML
const ledeHtml = computed(() => {
  const md = (now.value as any)?.lede || "";
  // Simple inline markdown for links: [text](url)
  return md
    .replace(/\n/g, " ")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">$1</a>'
    );
});
</script>

<style scoped>
.week-prose :deep(p) {
  margin: 0;
}
.week-prose :deep(p + p) {
  margin-top: 0.7em;
}
</style>
