<template>
  <NuxtLayout name="content">
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
  title: "Blog Category | Vishnu Jayadevan",
  description:
    "Browse articles by category on software engineering, distributed systems, technology leadership, and personal experiences. Find in-depth technical content and insights from a software engineer's perspective.",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const breadcrumbs = (): BreadCrumb[] => {
  const breadcrumbs: BreadCrumb[] = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
  ];
  return breadcrumbs;
};
const route = useRoute();
const category = Array.isArray(route.params.category)
  ? route.params.category.join(",")
  : route.params.category;
</script>
