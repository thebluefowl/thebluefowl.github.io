<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle :title="page.title" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <h2 class="text-sm font-bold font-sans">2026</h2>
      <ContentDoc />
      <h2 class="text-sm font-bold font-sans mt-8">2025</h2>
      <ContentRenderer :value="reading2025" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

const { page } = useContent();

const { data: reading2025 } = await useAsyncData('reading-2025', () =>
  queryContent('/reading-2025').findOne()
);

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "Home", to: "/" }];
});
</script>
