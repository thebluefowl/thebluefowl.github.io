<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 flex flex-wrap gap-8 lg:gap-12">
      <div class="flex-[1_1_480px] min-w-0 lg:pb-16">
        <h1 class="font-garamond font-normal text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0 [&_strong]:font-normal [&_strong]:italic" v-html="heroHtml"></h1>
        <p v-for="(para, i) in page?.intro" :key="i" :class="['font-garamond text-[20px] leading-[1.5] text-[#333] mb-0 max-w-[62ch]', i ? 'mt-4' : 'mt-8']" v-html="useInlineMd(para)"></p>
        <p class="mt-5 mb-0 text-[20px]">
          <NuxtLink to="/about/malayalam" class="font-garamond italic text-black border-b border-[#ddd8cf] hover:text-gray-600 transition-colors">Read this in Malayalam (മലയാളം)</NuxtLink>
        </p>
      </div>
      <img
        src="/images/about.jpg"
        alt="Portrait of Vishnu Jayadevan"
        width="640"
        height="800"
        class="self-end mx-auto mb-14 lg:mb-0 w-full max-w-[320px] aspect-[4/5] object-cover"
      />
    </section>

    <section class="border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">Work</h2>
      <div
        v-for="job in page?.jobs"
        :key="job.co"
        class="flex flex-wrap gap-x-12 gap-y-3 py-7 border-b border-[#ddd8cf]"
      >
        <div class="flex-[1_1_240px] min-w-0">
          <div class="font-garamond text-[28px] leading-[1.1]">{{ job.co }}</div>
          <div class="font-mono text-[12px] text-gray-600 mt-2">{{ job.years }}</div>
        </div>
        <div class="flex-[3_1_400px] min-w-0 flex flex-col gap-5">
          <div v-for="role in job.roles" :key="role.title">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span class="font-garamond text-[22px] font-medium">{{ role.title }}</span>
              <span class="font-mono text-[12px] text-gray-600">{{ role.tag }}</span>
            </div>
            <p v-for="(para, i) in role.body" :key="i" :class="['font-garamond text-[18px] leading-[1.5] text-[#333] mb-0', i ? 'mt-2.5' : 'mt-1.5']">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-24 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">Beyond work</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
        <div v-for="b in page?.beyond" :key="b.h" class="py-5 border-b border-[#ddd8cf]">
          <h3 class="font-garamond font-normal text-[28px] leading-[1.1] m-0">{{ b.h }}</h3>
          <p class="font-garamond text-[18px] leading-[1.5] text-[#333] mt-2.5 mb-0 max-w-[62ch]">{{ b.p }}</p>
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-24 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">Elsewhere</h2>
      <a
        v-for="e in page?.elsewhere"
        :key="e.label"
        :href="e.href"
        :target="e.external ? '_blank' : undefined"
        :rel="e.external ? 'noopener' : undefined"
        class="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 py-[18px] border-b border-[#ddd8cf] text-black no-underline hover:text-slate-500 transition-colors"
      >
        <span class="font-garamond text-[28px] leading-[1.1] flex-[0_0_160px]">{{ e.label }}</span>
        <span class="italic text-gray-600 text-[18px] flex-[1_1_240px] text-right">{{ e.hint }}</span>
      </a>
    </section>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: page } = await useAsyncData("about-page", () =>
  queryContent("/about").findOne()
);

useSeoMeta({
  title: () => `${page.value?.title ?? "About"} | Vishnu Jayadevan`,
  description: () => page.value?.description ?? "A longer introduction.",
  ogTitle: () => `${page.value?.title ?? "About"} | Vishnu Jayadevan`,
  ogDescription: () => page.value?.description ?? "A longer introduction.",
});

const heroHtml = computed(() => useInlineMd((page.value as any)?.hero));
</script>
