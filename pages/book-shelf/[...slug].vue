<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle :title="page.title" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <h2 class="text-sm font-bold font-sans">2025</h2>
      <ContentDoc />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

const { page } = useContent();

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "~", to: "/" }];
});
</script>
