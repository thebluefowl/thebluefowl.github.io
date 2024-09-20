<template>
  <NuxtLayout>
    <template #header>
      <PageTitle :title="category" :breadcrumbs="breadcrumbs()" />
    </template>
    <template #body>
      <Toc :filter="category" :showCategory="false" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  title: "Blog",
  description: "Blog posts by Vishnu Jayadevan",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const breadcrumbs = (): BreadCrumb[] => {
  const breadcrumbs: BreadCrumb[] = [
    { label: "~", to: "/" },
    { label: "Blog", to: "/blog" },
  ];
  return breadcrumbs;
};
const route = useRoute();
const category = Array.isArray(route.params.category)
  ? route.params.category.join(",")
  : route.params.category;
</script>
