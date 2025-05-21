<template>
  <h1 class="py-48 font-garamond">
    <div class="text-lg">
      <span v-for="(breadcrumb, index) in props.breadcrumbs" :key="index">
        <NuxtLink :to="breadcrumb.to" class="">
          <span>{{ breadcrumb.label }}</span>
        </NuxtLink>
        /
      </span>
    </div>
    <div class="text-6xl leading-normal">
      {{ props.title }}
    </div>
    <span>{{ props.date }}</span>
  </h1>
</template>

<script setup lang="ts">
export interface BreadCrumb {
  label: string;
  to: string;
}
const props = defineProps<{
  title?: string;
  breadcrumbs: BreadCrumb[];
  date?: string;
}>();
</script>
