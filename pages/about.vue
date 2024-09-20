<template>
  <NuxtLayout>
    <template #header>
      <PageTitle title="About" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <div class="font-sans tracking-wider mb-2">
        <span v-on:click="lang = 'en'" class="cursor-pointer">EN</span>
        <span class="mx-2">|</span>
        <span v-on:click="lang = 'ml'" class="cursor-pointer">ML</span>
      </div>
      <AboutEnglish v-if="lang === 'en'" />
      <AboutMalayalam v-else />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  title: "About",
  description: "About Vishnu Jayadevan",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const lang = ref("en");

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "~", to: "/" }];
});
</script>
