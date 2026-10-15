<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 flex flex-wrap gap-8 lg:gap-12">
      <div class="flex-[1_1_480px] min-w-0 lg:pb-16">
        <h1 class="font-malayalam font-normal text-[30px] md:text-[44px] lg:text-[52px] leading-[1.35] max-w-[980px] m-0 [&_strong]:font-normal [&_strong]:italic" v-html="heroHtml"></h1>
        <p v-for="(para, i) in page?.intro" :key="i" :class="['font-malayalam text-[17px] md:text-[19px] leading-[1.7] text-[#333] mb-0 max-w-[62ch]', i ? 'mt-4' : 'mt-8']" v-html="useInlineMd(para)"></p>
        <p class="mt-5 mb-0 text-[20px]">
          <NuxtLink to="/about" class="font-malayalam text-black border-b border-[#ddd8cf] hover:text-gray-600 transition-colors">ഇംഗ്ലീഷിൽ വായിക്കുക (English)</NuxtLink>
        </p>
      </div>
      <img
        src="/images/about.jpg"
        alt="വിഷ്ണു ജയദേവന്റെ ചിത്രം"
        width="640"
        height="800"
        class="self-end mx-auto mb-14 lg:mb-0 w-full max-w-[320px] aspect-[4/5] object-cover"
      />
    </section>

    <section class="border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5 font-malayalam !normal-case !tracking-normal !text-[14px]">തൊഴിൽവഴികൾ</h2>
      <div
        v-for="job in page?.jobs"
        :key="job.co"
        class="flex flex-wrap gap-x-12 gap-y-3 py-7 border-b border-[#ddd8cf]"
      >
        <div class="flex-[1_1_240px] min-w-0">
          <div class="font-malayalam text-[24px] md:text-[28px] leading-[1.2]">{{ job.co }}</div>
          <div class="font-mono text-[12px] text-gray-600 mt-2">{{ job.years }}</div>
        </div>
        <div class="flex-[3_1_400px] min-w-0 flex flex-col gap-5">
          <div v-for="role in job.roles" :key="role.title">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span class="font-malayalam text-[18px] md:text-[20px] leading-[1.4] font-medium">{{ role.title }}</span>
              <span class="font-mono text-[12px] text-gray-600">{{ role.tag }}</span>
            </div>
            <p v-for="(para, i) in role.body" :key="i" :class="['font-malayalam text-[16px] md:text-[17px] leading-[1.7] text-[#333] mb-0', i ? 'mt-2.5' : 'mt-1.5']">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-24 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5 font-malayalam !normal-case !tracking-normal !text-[14px]">ജോലിക്കപ്പുറം</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
        <div v-for="b in page?.beyond" :key="b.h" class="py-5 border-b border-[#ddd8cf]">
          <h3 class="font-malayalam font-normal text-[22px] md:text-[24px] leading-[1.3] m-0">{{ b.h }}</h3>
          <p v-for="(para, i) in b.p" :key="i" class="font-malayalam text-[16px] md:text-[17px] leading-[1.7] text-[#333] mt-2.5 mb-0 max-w-[62ch]">{{ para }}</p>
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-24 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5 font-malayalam !normal-case !tracking-normal !text-[14px]">മറ്റിടങ്ങളിൽ</h2>
      <a
        v-for="e in page?.elsewhere"
        :key="e.label"
        :href="e.href"
        :target="e.external ? '_blank' : undefined"
        :rel="e.external ? 'noopener' : undefined"
        class="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 py-[18px] border-b border-[#ddd8cf] text-black no-underline hover:text-slate-500 transition-colors"
      >
        <span class="font-malayalam text-[24px] md:text-[28px] leading-[1.2] flex-[0_0_160px]">{{ e.label }}</span>
        <span class="font-malayalam text-gray-600 text-[16px] md:text-[18px] flex-[1_1_240px] text-right">{{ e.hint }}</span>
      </a>
    </section>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const { data: page } = await useAsyncData("about-ml-page", () =>
  queryContent("/about-ml").findOne()
);

useSeoMeta({
  title: () => `${page.value?.title ?? "എന്നെക്കുറിച്ച്"} | വിഷ്ണു ജയദേവൻ`,
  description: () => page.value?.description ?? "ഒരു ദീർഘ പരിചയം.",
});

const heroHtml = computed(() => useInlineMd((page.value as any)?.hero));
</script>

<style>
.font-malayalam {
  font-family: "Noto Serif Malayalam", serif;
}
</style>
