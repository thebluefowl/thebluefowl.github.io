<template>
  <ManuscriptShell>
    <Folio page-label="Elsewhere" subtitle="Where to find me on the rest of the internet" />

    <p
      v-if="page?.lede"
      class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]"
      v-html="ledeHtml"
    ></p>

    <template v-for="group in page?.groups" :key="group.title">
      <SectionHead :num="group.num" :title="group.title" />
      <ul class="list-none m-0 p-0 flex flex-col gap-[18px]">
        <li v-for="r in group.rows" :key="r.label" class="flex items-baseline">
          <a
            :href="r.href"
            :target="r.external ? '_blank' : undefined"
            :rel="r.external ? 'noopener' : undefined"
            class="shrink-0 text-black no-underline hover:text-slate-500 transition-colors"
          >
            <span class="font-garamond text-[24px] md:text-[28px] font-medium tracking-[-0.005em]">{{ r.label }}</span>
            <span v-if="r.handle" class="ml-3 align-middle font-sans text-[12px] tracking-[0.04em] text-gray-500">{{ r.handle }}</span>
          </a>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
          <span class="font-garamond italic text-[16px] md:text-[17px] text-gray-600 shrink-0">{{ r.hint }}</span>
        </li>
      </ul>
    </template>

    <Signoff><em>last verified {{ page?.updated }}</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: page } = await useAsyncData("elsewhere-page", () =>
  queryContent("/elsewhere").findOne()
);

useSeoMeta({
  title: () => `${page.value?.title ?? "Elsewhere"} | Vishnu Jayadevan`,
  description: () => page.value?.description ?? "Where to find me on the rest of the internet.",
  ogTitle: () => `${page.value?.title ?? "Elsewhere"} | Vishnu Jayadevan`,
  ogDescription: () => page.value?.description ?? "Where to find me on the rest of the internet.",
});

const ledeHtml = computed(() => useInlineMd((page.value as any)?.lede));
</script>
