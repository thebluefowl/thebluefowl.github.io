<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// Every page names its own .com URL, so copies on other domains credit the .com.
const route = useRoute();
useHead({
  link: [{ rel: "canonical", href: () => `https://vishnujayadevan.com${route.path.replace(/\/$/, "")}` }],
});
</script>
