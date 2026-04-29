<template>
  <ManuscriptShell>
    <Folio page-label="Reading" subtitle="On the shelf" />

    <div class="grid grid-cols-[auto_1fr] gap-7 items-start">
      <span
        class="font-garamond font-medium text-[140px] md:text-[200px] leading-[0.78] tracking-[-0.04em] text-black -mt-2 select-none"
        aria-hidden="true"
      >B</span>
      <p class="font-garamond text-[24px] md:text-[28px] leading-[1.35] text-black m-0">
        <span class="italic">ooks I'm reading,</span> have read, or have on the shelf.
        Stars are personal, not advice. The list goes back to 2025; older years live in my notes.
      </p>
    </div>

    <div class="mt-12">
      <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium mb-6">
        2026
      </div>
      <ol class="reading-list list-none m-0 p-0 flex flex-col gap-3.5">
        <ContentDoc />
      </ol>
    </div>

    <hr class="border-0 border-t border-gray-300 my-14" />

    <div>
      <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium mb-6">
        2025
      </div>
      <ol class="reading-list list-none m-0 p-0 flex flex-col gap-3.5">
        <ContentRenderer :value="reading2025" />
      </ol>
    </div>

    <Signoff><em>updated as I go</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
const { data: reading2025 } = await useAsyncData("reading-2025", () =>
  queryContent("/reading-2025").findOne()
);

useSeoMeta({
  title: "Reading | Vishnu Jayadevan",
  description: "Books I'm reading, have read, or have on the shelf.",
  ogTitle: "Reading | Vishnu Jayadevan",
  ogDescription: "Books I'm reading, have read, or have on the shelf.",
});
</script>
