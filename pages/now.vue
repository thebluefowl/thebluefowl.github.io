<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="Now" :breadcrumbs="[{ label: 'Home', to: '/' }]" />
    </template>
    <template #body>
      <div class="pb-24 font-garamond">
        <p class="text-base text-gray-500 mb-8">
          What I'm focused on right now. Updated {{ updated }}.
          Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener" class="underline hover:text-gray-700">Derek Sivers' /now movement</a>.
        </p>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Work</h2>
          <p class="text-lg leading-relaxed">
            Back in the IC seat at <a href="https://deepsource.com" class="underline hover:text-gray-700">DeepSource</a> as a Staff Engineer.
            Working across product and platform problems: making analysis faster, the experience tighter, and the
            internals easier to extend.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Writing</h2>
          <p class="text-lg leading-relaxed">
            Slowly building up a series on the math and trade-offs behind distributed systems primitives.
            The most recent post is on
            <NuxtLink to="/blog" class="underline hover:text-gray-700">jump consistent hashing</NuxtLink>.
            Next up: probabilistic data structures.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Reading</h2>
          <p class="text-lg leading-relaxed">
            Currently in the middle of <em>Eurotrash</em> by Christian Kracht. The
            <NuxtLink to="/reading" class="underline hover:text-gray-700">full list is here</NuxtLink>.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Outside the keyboard</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>Tending a planted aquarium. Mostly losing the fight with algae.</li>
            <li>Picking Malayalam back up as a writing language, slowly.</li>
            <li>Walking a lot. Bangalore is best at 6am.</li>
          </ul>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  documentDriven: { page: false, surround: false },
});

useSeoMeta({
  title: "Now | Vishnu Jayadevan",
  description: "What I'm focused on right now: work, writing, reading, and life outside the keyboard.",
  ogTitle: "Now | Vishnu Jayadevan",
  ogDescription: "What I'm focused on right now.",
});

const updated = "April 2026";
</script>
