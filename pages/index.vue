<template>
  <NuxtLayout name="content">
    <template #body>
      <div class="w-full min-h-[calc(100vh-5rem)] flex items-center">
        <div class="w-full max-w-3xl">
          <h1 class="text-4xl leading-relaxed font-garamond">
            Hi, I am <span class="font-semibold">Vishnu Jayadevan</span>,
            software engineer based out of Bangalore, India. I lead engineering
            at
            <a href="https://deepsource.com" class="underline">DeepSource</a>.
            Previously building enterprise software at
            <a href="https://exotel.com" class="underline">Exotel</a>.
          </h1>
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
  title: "Vishnu Jayadevan | Software Engineer & Writer",
  description:
    "Software engineer and writer based in Bangalore, India. Leading engineering at DeepSource, building tools for better code. Writing about technology, distributed systems, and software architecture.",
  documentDriven: {
    page: false,
    surround: false,
  },
});
</script>
