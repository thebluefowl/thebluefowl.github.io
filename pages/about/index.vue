<template>
  <ManuscriptShell>
    <Folio page-label="About" subtitle="A longer introduction" />

    <p
      class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]"
      v-html="introHtml"
    ></p>

    <div
      class="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500"
    >
      <span>Read in</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <div class="flex gap-1">
        <NuxtLink
          to="/about"
          class="px-2 py-1 border border-black bg-black text-white"
          >EN</NuxtLink
        >
        <NuxtLink
          to="/about/malayalam"
          class="px-2 py-1 border border-transparent hover:border-gray-300 hover:text-black transition-colors"
          >ML</NuxtLink
        >
      </div>
    </div>

    <SectionHead num="I" title="Career" />
    <div class="flex flex-col gap-9">
      <div
        v-for="job in page?.jobs"
        :key="job.co"
        class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start"
      >
        <div class="flex flex-col gap-1.5">
          <h3
            class="font-garamond font-semibold text-[28px] leading-none tracking-[-0.01em] m-0"
          >
            {{ job.co }}
          </h3>
          <div
            class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500"
          >
            {{ job.years }}
          </div>
        </div>
        <div class="flex flex-col gap-[18px] font-garamond">
          <div
            v-for="role in job.roles"
            :key="role.title"
            class="flex flex-col gap-1"
          >
            <div class="flex items-baseline">
              <span
                class="font-garamond italic font-medium text-[19px] text-black shrink-0"
                >{{ role.title }}</span
              >
              <span
                class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"
              ></span>
              <span
                class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0"
                >{{ role.tag }}</span
              >
            </div>
            <p
              class="text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch]"
            >
              {{ role.body }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <SectionHead num="II" title="Beyond work" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
      <div v-for="b in page?.beyond" :key="b.h" class="flex flex-col gap-1.5">
        <div class="flex items-baseline">
          <h3 class="font-garamond font-semibold text-[22px] m-0 shrink-0">
            {{ b.h }}
          </h3>
          <span
            class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"
          ></span>
        </div>
        <p
          class="font-garamond text-[16px] leading-[1.55] text-gray-800 m-1 mt-1 max-w-[60ch]"
        >
          {{ b.p }}
        </p>
      </div>
    </div>

    <SectionHead num="III" title="Elsewhere" />
    <ul
      class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3.5"
    >
      <li v-for="e in page?.elsewhere" :key="e.label" class="flex items-baseline">
        <a
          :href="e.href"
          :target="e.external ? '_blank' : undefined"
          :rel="e.external ? 'noopener' : undefined"
          class="font-garamond text-[24px] font-medium text-black no-underline shrink-0 hover:text-slate-500 transition-colors"
          >{{ e.label }}</a
        >
        <span
          class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"
        ></span>
        <span
          class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0"
          >{{ e.hint }}</span
        >
      </li>
    </ul>

    <Signoff><em>V.J., Bangalore</em></Signoff>
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

const introHtml = computed(() => useInlineMd((page.value as any)?.intro));
</script>
