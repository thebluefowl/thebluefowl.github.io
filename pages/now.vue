<template>
  <ManuscriptShell wide>
    <header class="pt-6 md:pt-10 pb-10 mb-10 border-b border-black">
      <p class="font-mono text-[12px] text-gray-600 m-0">{{ now?.updated }} · {{ now?.location }}</p>
      <h1 class="font-garamond font-normal text-[clamp(36px,5.5vw,56px)] leading-[1.08] tracking-[-0.02em] max-w-[900px] mt-6 mb-0">{{ now?.title }}</h1>
      <p v-if="now?.lede" class="text-[22px] leading-[1.45] italic text-[#333] max-w-[760px] mt-6 mb-0" v-html="ledeHtml"></p>
    </header>

    <ContentRenderer
      v-if="now"
      :value="now"
      class="max-w-[680px] font-garamond text-[20px] leading-[1.65] text-black
        [&_p]:mt-0 [&_p]:mb-[1.1em]
        [&_h2]:mt-[1.8em] [&_h2]:mb-[0.6em] [&_h2:first-child]:mt-0 [&_h2]:text-[30px] [&_h2]:leading-[1.15] [&_h2]:font-medium
        [&_h2_a]:no-underline [&_h2_a]:text-inherit
        [&_p_a]:underline [&_p_a]:decoration-1 [&_p_a]:underline-offset-[3px] [&_p_a:hover]:text-slate-500"
    />

    <div class="flex flex-wrap justify-between items-baseline gap-x-6 gap-y-3 mt-16 pt-5 border-t border-[#ddd8cf] font-mono text-[12px] uppercase tracking-[0.08em]">
      <span class="text-gray-600">Last updated {{ now?.lastUpdated }}</span>
      <NuxtLink to="/" class="hover:text-slate-500 transition-colors">&larr; Back home</NuxtLink>
    </div>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: now } = await useAsyncData("now-page", () =>
  queryContent("/now").findOne()
);

useSeoMeta({
  title: () => `${now.value?.title ?? "Now"} | Vishnu Jayadevan`,
  description: () => now.value?.description ?? "What I'm up to these days.",
  ogTitle: () => `${now.value?.title ?? "Now"} | Vishnu Jayadevan`,
  ogDescription: () => now.value?.description ?? "What I'm up to these days.",
});

const ledeHtml = computed(() => useInlineMd((now.value as any)?.lede));
</script>
