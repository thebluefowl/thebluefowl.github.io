<template>
  <ManuscriptShell wide>
    <section class="pt-10 md:pt-24 pb-6">
      <h1 class="font-garamond font-normal text-[clamp(40px,6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0">Books I'm reading, have read, or have on the shelf.</h1>
    </section>
    <p class="font-garamond italic text-[22px] leading-[1.45] text-gray-800 m-0 mb-6">Stars are personal, not advice.</p>

    <section class="mt-14 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-3">2026</h2>
      <ol class="list-none m-0 p-0">
        <ContentDoc />
      </ol>
    </section>

    <section class="mt-14 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-3">2025</h2>
      <ol class="list-none m-0 p-0">
        <ContentRenderer :value="reading2025" />
      </ol>
    </section>

    <section class="mt-14 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-3">On the shelf</h2>
      <ol class="list-none m-0 p-0">
        <ContentRenderer :value="readingShelf" />
      </ol>
    </section>

  </ManuscriptShell>
</template>

<script setup lang="ts">
const { data: reading2025 } = await useAsyncData("reading-2025", () =>
  queryContent("/reading-2025").findOne()
);
const { data: readingShelf } = await useAsyncData("reading-shelf", () =>
  queryContent("/reading-shelf").findOne()
);

useSeoMeta({
  title: "Reading | Vishnu Jayadevan",
  description: "Books I'm reading, have read, or have on the shelf.",
  ogTitle: "Reading | Vishnu Jayadevan",
  ogDescription: "Books I'm reading, have read, or have on the shelf.",
});
</script>
