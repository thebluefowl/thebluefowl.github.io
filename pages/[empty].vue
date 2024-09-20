<template>
  <NuxtLayout name="home">
    <div
      class="flex flex-col gap-4 items-center justify-center h-screen font-garamond"
    >
      <h1 class="text-9xl">404</h1>
      <nuxt-link to="/" class="font-garamond text-2xl"
        >~ take me home</nuxt-link
      >
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: "404",
  description: "Page not found",
  documentDriven: {
    page: false,
    surround: false,
  },
});
</script>
