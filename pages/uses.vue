<template>
  <ManuscriptShell>
    <Folio page-label="Uses" subtitle="Tools, software, and bits of hardware I reach for" />

    <p
      v-if="page?.lede"
      class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]"
      v-html="ledeHtml"
    ></p>

    <template v-for="g in page?.groups" :key="g.title">
      <SectionHead :num="g.num" :title="g.title" />
      <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
        <li v-for="row in g.rows" :key="row.k" class="flex items-baseline">
          <span class="font-garamond text-[22px] font-medium text-black shrink-0">{{ row.k }}</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
          <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">{{ row.v }}</span>
        </li>
      </ul>
    </template>

    <Signoff><em>last updated {{ page?.updated }}</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: page } = await useAsyncData("uses-page", () =>
  queryContent("/uses").findOne()
);

useSeoMeta({
  title: () => `${page.value?.title ?? "Uses"} | Vishnu Jayadevan`,
  description: () => page.value?.description ?? "Tools, software, and hardware I reach for.",
  ogTitle: () => `${page.value?.title ?? "Uses"} | Vishnu Jayadevan`,
  ogDescription: () => page.value?.description ?? "Tools, software, and hardware I reach for.",
});

const ledeHtml = computed(() => useInlineMd((page.value as any)?.lede));
</script>
