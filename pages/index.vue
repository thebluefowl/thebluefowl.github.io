<template>
  <NuxtLayout name="content">
    <template #body>
      <div class="w-full h-full flex items-center justify-center">
        <div>
          <p class="mt-8 text-4xl leading-relaxed font-garamond">
            Hi, I am <span class="font-semibold">Vishnu Jayadevan</span>,
            software engineer based out of Bangalore, India. I lead engineering
            at
            <a href="https://deepsource.com" class="underline">DeepSource</a>.
            Previously building enterprise software at
            <a href="https://exotel.com" class="underline">Exotel</a>.
          </p>
          <p class="mt-8 text-2xl leading-relaxed font-garamond">
            You can find me on
            <a
              href="https://github.com/thebluefowl"
              target="_blank"
              class="underline"
              >GitHub</a
            >,
            <a
              href="https://bsky.app/profile/vishnujayadevan.com"
              target="_blank"
              class="underline"
              >Bluesky</a
            >
            and
            <a
              href="https://www.linkedin.com/in/vishnujayadevan/"
              target="_blank"
              class="underline"
              >LinkedIn</a
            >.
          </p>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Home",
  description: "Personal website and blog of Vishnu Jayadevan",
  documentDriven: {
    page: false,
    surround: false,
  },
});
</script>

<style scoped>
/* Add subtle text shadow for depth */
h1 {
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
}
</style>
