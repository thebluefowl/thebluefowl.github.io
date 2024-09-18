<template>
  <NuxtLayout>
    <template #header>
      <PageTitle :title="page.title" :breadcrumbs="breadcrumbs(page)"/>
    </template>
    <template #body>
      <ContentDoc class="text-2xl font-light font-garamond"/>
      <hr class="my-8">
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from '~/components/PageTitle.vue';

const breadcrumbs = (page: any): BreadCrumb[] => {
  const breadcrumbs: BreadCrumb[] = [
    {label:'~', to: '/'},
    { label: 'Blog', to: '/blog' },
    {label: page.category, to: `/blog/category/${page.category}`},
  ];
  return breadcrumbs;
};

const { page } = useContent();
</script>