<template>
  <NuxtLayout>
    <template #header>
      <PageTitle :title="page.title" :breadcrumbs="computedBreadcrumbs"/>
    </template>
    <template #body>
      {{  usePrettyDate(page.date) }}
      <ContentDoc class="text-2xl font-light font-garamond leading-relaxed"/>
      <hr class="my-8">
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from '~/components/PageTitle.vue';
const { page } = useContent();



useHead({
  title: page?.value?.title || 'Blog Post',
  meta: [
    { name: 'description', content: page?.value?.description || 'Blog Post' },
    { property: 'og:title', content: page?.value?.title || 'Blog Post' },
    { property: 'og:description', content: page?.value?.description || 'Blog Post' },
  ]
})

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  if (!page.value) return [];
  
  return [
    { label: '~', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: page.value.category || 'Uncategorized', to: `/blog/category/${page.value.category || 'uncategorized'}` },
  ]
})


</script>