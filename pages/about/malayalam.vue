<template>
  <ManuscriptShell>
    <Folio page-label="എന്നെക്കുറിച്ച്" subtitle="ഒരു ദീർഘ പരിചയം" />

    <p
      class="font-malayalam text-[20px] md:text-[22px] leading-[1.6] text-black m-0 max-w-[60ch]"
      v-html="introHtml"
    ></p>

    <div class="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">
      <span>Read in</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <div class="flex gap-1">
        <NuxtLink to="/about" class="px-2 py-1 border border-transparent hover:border-gray-300 hover:text-black transition-colors">EN</NuxtLink>
        <NuxtLink to="/about/malayalam" class="px-2 py-1 border border-black bg-black text-white">ML</NuxtLink>
      </div>
    </div>

    <SectionHead num="I">
      <span class="font-malayalam">ജോലി</span>
    </SectionHead>
    <div class="flex flex-col gap-9 font-malayalam">
      <div v-for="job in page?.jobs" :key="job.co" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start">
        <div class="flex flex-col gap-1.5">
          <h3 class="font-malayalam font-bold text-[24px] md:text-[28px] leading-tight m-0">{{ job.co }}</h3>
          <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">{{ job.years }}</div>
        </div>
        <div class="flex flex-col gap-[18px]">
          <div v-for="role in job.roles" :key="role.title" class="flex flex-col gap-1">
            <div class="flex items-baseline">
              <span class="font-malayalam font-semibold text-[18px] md:text-[19px] text-black shrink-0">{{ role.title }}</span>
              <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
              <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">{{ role.tag }}</span>
            </div>
            <p class="font-malayalam text-[16px] md:text-[17px] leading-[1.65] text-gray-800 m-0 max-w-[60ch]">{{ role.body }}</p>
          </div>
        </div>
      </div>
    </div>

    <SectionHead num="II">
      <span class="font-malayalam">ജോലിക്കപ്പുറം</span>
    </SectionHead>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 font-malayalam">
      <div v-for="b in page?.beyond" :key="b.h" class="flex flex-col gap-1.5">
        <div class="flex items-baseline">
          <h3 class="font-malayalam font-bold text-[20px] md:text-[22px] m-0 shrink-0">{{ b.h }}</h3>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        </div>
        <p class="font-malayalam text-[15px] md:text-[16px] leading-[1.65] text-gray-800 m-0 max-w-[60ch]">{{ b.p }}</p>
      </div>
    </div>

    <SectionHead num="III">
      <span class="font-malayalam">മറ്റിടങ്ങളിൽ</span>
    </SectionHead>
    <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3.5">
      <li v-for="e in page?.elsewhere" :key="e.label" class="flex items-baseline">
        <a :href="e.href" :target="e.external ? '_blank' : undefined" :rel="e.external ? 'noopener' : undefined" class="font-garamond text-[24px] font-medium text-black no-underline shrink-0 hover:text-slate-500 transition-colors">{{ e.label }}</a>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-malayalam text-[14px] md:text-[15px] text-gray-600 shrink-0">{{ e.hint }}</span>
      </li>
    </ul>

    <Signoff>
      <em class="font-malayalam">വി.ജെ., ബാംഗ്ലൂർ</em>
    </Signoff>
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

const introHtml = computed(() => useInlineMd((page.value as any)?.intro));
</script>

<style>
.font-malayalam {
  font-family: "Noto Serif Malayalam", serif;
}
</style>
