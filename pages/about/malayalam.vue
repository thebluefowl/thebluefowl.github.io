<template>
  <NuxtLayout>
    <template #header>
      <PageTitle title="About" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <div class="font-sans tracking-wider mb-2">
        <nuxt-link class="cursor-pointer" to="/about">EN</nuxt-link>
        <span class="mx-2">|</span>
        <nuxt-link class="cursor-pointer" to="/about/malayalam">ML</nuxt-link>
      </div>
      <div class="pb-8">
        <AboutMalayalam />
      </div>
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

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "~", to: "/" }];
});
</script>
