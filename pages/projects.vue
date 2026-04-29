<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="Projects" :breadcrumbs="[{ label: 'Home', to: '/' }]" />
    </template>
    <template #body>
      <div class="pb-24 font-garamond">
        <p class="text-base text-gray-500 mb-12">
          A loose collection of work, side projects, and other things I've put my name on.
        </p>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Work</h2>
          <ul class="space-y-6">
            <li>
              <div class="flex items-baseline justify-between gap-4">
                <a href="https://deepsource.com" class="text-xl underline hover:text-gray-700">DeepSource</a>
                <span class="text-sm text-gray-500 font-sans">2020 &ndash; Present</span>
              </div>
              <p class="text-base text-gray-700 mt-1 leading-relaxed">
                Code quality and security for fast-moving teams. Helped take it from zero to one.
                Built the frontend, public API, CLI, reporting, and on-prem deployments.
                Led product, platform, and security engineering. Now back to IC, working across the stack.
              </p>
            </li>
            <li>
              <div class="flex items-baseline justify-between gap-4">
                <a href="https://exotel.com" class="text-xl underline hover:text-gray-700">Exotel</a>
                <span class="text-sm text-gray-500 font-sans">2015 &ndash; 2019</span>
              </div>
              <p class="text-base text-gray-700 mt-1 leading-relaxed">
                Joined at 21. Built internal tooling, then helped build a telephony platform that
                ended up handling billions of calls.
              </p>
            </li>
          </ul>
        </section>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Patents</h2>
          <ul class="space-y-2">
            <li>
              <div class="text-lg">A telephony routing system</div>
              <div class="text-sm text-gray-500 font-sans">Filed during my time at Exotel.</div>
            </li>
          </ul>
        </section>

        <section class="mb-12">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Open source</h2>
          <p class="text-base leading-relaxed">
            Bits and pieces on
            <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" class="underline hover:text-gray-700">GitHub</a>.
            Mostly small tools and experiments rather than libraries with users.
          </p>
        </section>

        <section>
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">This site</h2>
          <p class="text-base leading-relaxed">
            Built with Nuxt and Tailwind, set in EB Garamond. Notes on the stack on the
            <NuxtLink to="/uses" class="underline hover:text-gray-700">uses page</NuxtLink>.
          </p>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Projects | Vishnu Jayadevan",
  description: "Work, side projects, patents, and open source.",
  ogTitle: "Projects | Vishnu Jayadevan",
  ogDescription: "Work, side projects, patents, and open source.",
});
</script>
