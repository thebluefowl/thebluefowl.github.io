<template>
  <ManuscriptShell wide>
    <section class="pt-10 md:pt-24 pb-6">
      <h1 v-if="page?.lede" class="font-garamond font-normal text-[clamp(40px,6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0" v-html="ledeHtml"></h1>
      <div class="flex flex-wrap gap-x-8 gap-y-2 mt-10 font-mono text-[13px] text-gray-600">
        <span>A <a href="https://uses.tech" target="_blank" rel="noopener" class="hover:text-slate-500 transition-colors">/uses</a> page</span>
        <span>Updated {{ page?.updated }}</span>
      </div>
    </section>

    <section v-for="g in page?.groups" :key="g.title" class="mt-14 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">{{ g.num }} · {{ g.title }}</h2>
      <ul class="list-none m-0 p-0">
        <li v-for="row in g.rows" :key="row.k" class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-[#ddd8cf]">
          <span class="font-garamond text-[24px]">{{ row.k }}</span>
          <span class="italic text-gray-600 text-[20px] flex-[1_1_260px] text-right">{{ row.v }}</span>
        </li>
      </ul>
    </section>

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
