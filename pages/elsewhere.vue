<template>
  <ManuscriptShell wide>
    <section class="pt-10 md:pt-24 pb-6">
      <h1 v-if="lede" class="font-garamond font-normal text-[clamp(40px,6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0">{{ lede[0] }}</h1>
      <p v-if="lede?.[1]" class="font-garamond text-[20px] leading-[1.5] text-gray-800 max-w-[62ch] mt-8 mb-0" v-html="restHtml"></p>
    </section>

    <section v-for="group in page?.groups" :key="group.title" class="mt-14 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">{{ group.num }} · {{ group.title }}</h2>
      <a
        v-for="r in group.rows"
        :key="r.label"
        :href="r.href"
        :target="r.external ? '_blank' : undefined"
        :rel="r.external ? 'noopener' : undefined"
        class="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 py-[18px] border-b border-[#ddd8cf] text-black no-underline hover:text-slate-500 transition-colors"
      >
        <span class="font-garamond text-[28px] leading-[1.1] flex-[0_0_160px]">{{ r.label }}</span>
        <span class="font-mono text-[13px] flex-[0_1_260px] min-w-0 break-words">{{ r.handle }}</span>
        <span class="italic text-gray-600 text-[18px] flex-[1_1_240px] text-right">{{ r.hint }}</span>
      </a>
    </section>

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

// Hero = first sentence of the lede; the rest renders as the intro paragraph.
const lede = computed(() => {
  const m = ((page.value as any)?.lede ?? "").trim().match(/^(.+?[.!?])\s+(.*)$/s);
  return m ? [m[1], m[2]] : [((page.value as any)?.lede ?? "").trim()];
});
const restHtml = computed(() => useInlineMd(lede.value[1]));
</script>
