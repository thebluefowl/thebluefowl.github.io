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
  title: "Blog | Vishnu Jayadevan's Blog",
  description:
    "Explore articles on software engineering, distributed systems, and technology leadership. Find insights on software architecture, engineering management, and technical deep-dives. Regular updates on tech trends and personal experiences in software development.",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const breadcrumbs = (): BreadCrumb[] => {
  const breadcrumbs: BreadCrumb[] = [{ label: "~", to: "/" }];
  return breadcrumbs;
};
</script>
