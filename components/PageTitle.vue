<template>
  <h1 class="py-16 md:py-32 lg:py-48 font-garamond">
    <div class="text-base md:text-lg">
      <span
        v-for="(breadcrumb, index) in props.breadcrumbs"
        :key="index"
        class="inline-flex items-center uppercase text-xs font-sans"
      >
        <NuxtLink :to="breadcrumb.to" class="">
          <span>{{ breadcrumb.label }}</span>
        </NuxtLink>
        <Icon name="mdi:chevron-right" class="mx-2 w-4 h-4" />
      </span>
    </div>
    <div class="text-4xl md:text-5xl lg:text-6xl leading-normal">
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
