<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="Blog" :breadcrumbs="breadcrumbs()" />
    </template>
    <template #body>
      <Toc :show-category="true" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  documentDriven: {
    page: false,
    surround: false,
  },
});

useSeoMeta({
  title: "Blog | Vishnu Jayadevan",
  description:
    "Articles on software engineering, distributed systems, and technology leadership.",
  ogTitle: "Blog | Vishnu Jayadevan",
  ogDescription:
    "Articles on software engineering, distributed systems, and technology leadership.",
});

const breadcrumbs = (): BreadCrumb[] => {
  const breadcrumbs: BreadCrumb[] = [{ label: "Home", to: "/" }];
  return breadcrumbs;
};
</script>
