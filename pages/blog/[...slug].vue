<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle :title="page.title" :breadcrumbs="computedBreadcrumbs" :font-class="titleFont" />
    </template>
    <template #body>
      <div :class="['text-sm text-gray-500 mb-6', isSWE ? 'font-plex' : '']">{{ usePrettyDate(page.date) }}</div>
      <ContentDoc :class="['prose max-w-none', contentFont]" />
      <hr class="my-8" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";
const { page } = useContent();

const isSWE = computed(() => page.value?.category === "Software Engineering");

const contentFont = computed(() =>
  isSWE.value ? "font-plex prose-base" : "font-garamond prose-lg"
);

const titleFont = computed(() =>
  isSWE.value ? "font-plex" : undefined
);

useHead({
  title: page?.value?.title || "Blog Post",
  meta: [
    { name: "description", content: page?.value?.description || "Blog Post" },
    { property: "og:title", content: page?.value?.title || "Blog Post" },
    { property: "og:description", content: page?.value?.description || "Blog Post" },
    { property: "og:type", content: "article" },
    { name: "twitter:title", content: page?.value?.title || "Blog Post" },
    { name: "twitter:description", content: page?.value?.description || "Blog Post" },
  ],
});

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  if (!page.value) return [];

  return [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    {
      label: page.value.category || "Uncategorized",
      to: `/blog/category/${page.value.category || "uncategorized"}`,
    },
  ];
});
</script>
