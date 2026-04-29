<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="Uses" :breadcrumbs="[{ label: 'Home', to: '/' }]" />
    </template>
    <template #body>
      <div class="pb-24 font-garamond">
        <p class="text-base text-gray-500 mb-12">
          The tools, software, and bits of hardware I reach for every day. A
          <a href="https://uses.tech" target="_blank" rel="noopener" class="underline hover:text-gray-700">/uses</a> page.
        </p>

        <section class="mb-10">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Editor &amp; terminal</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>Neovim for most things, VS Code when I'm in someone else's repo.</li>
            <li>Ghostty as a terminal. Fish as the shell.</li>
            <li>Tmux, but only when I need to.</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Languages I write most</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>Go and Python at work.</li>
            <li>TypeScript on the frontend.</li>
            <li>Bash, when avoiding it would take longer.</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">This website</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>Nuxt 3 with @nuxt/content for Markdown.</li>
            <li>Tailwind for layout, no UI kit.</li>
            <li>Set in EB Garamond, with Noto Serif Malayalam for the Malayalam pieces.</li>
            <li>Hosted on GitHub Pages.</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Hardware</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>MacBook Pro (M-series).</li>
            <li>External 27" 4K display.</li>
            <li>Mechanical keyboard with tactile switches. Nothing exotic.</li>
          </ul>
        </section>

        <section>
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">Reading &amp; writing</h2>
          <ul class="text-lg leading-relaxed list-disc pl-6 space-y-1">
            <li>Kindle for fiction. Paper for everything that needs annotating.</li>
            <li>Obsidian for notes, plain text in iCloud for drafts.</li>
          </ul>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Uses | Vishnu Jayadevan",
  description: "Tools, software, and hardware I reach for every day.",
  ogTitle: "Uses | Vishnu Jayadevan",
  ogDescription: "Tools, software, and hardware I reach for every day.",
});
</script>
