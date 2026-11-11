<template>
  <ManuscriptShell wide>
    <section class="pt-10 md:pt-24 pb-6">
      <h1 class="font-garamond font-normal text-[clamp(40px,6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0">Books I'm reading, have read, or have on the shelf.</h1>
    </section>
    <p class="font-garamond italic text-[22px] leading-[1.45] text-gray-800 m-0 mb-6">Stars are personal, not advice.</p>

    <div role="group" aria-label="View as" class="mt-4 flex border-b border-black font-mono">
      <button
        v-for="m in modes"
        :key="m.key"
        type="button"
        :aria-pressed="mode === m.key"
        class="min-h-[44px] px-[18px] -mb-px border-b-2 text-[12px] tracking-[0.14em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black"
        :class="mode === m.key ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'"
        @click="mode = m.key"
      >{{ m.label }}</button>
    </div>

    <div v-show="mode === 'shelf'" class="mt-7">
      <ClientOnly>
        <ReadingShelf :shelves="shelves" />
        <template #fallback><div class="h-[540px] md:h-[680px]" /></template>
      </ClientOnly>
    </div>

    <div v-show="mode === 'list'">
      <section class="pt-7">
        <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-3">2026</h2>
        <ol class="list-none m-0 p-0">
          <ContentRenderer :value="reading2026" />
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
    </div>
  </ManuscriptShell>
</template>

<script setup lang="ts">
const { data: reading2026 } = await useAsyncData("reading-2026", () =>
  queryContent("/reading").findOne()
);
const { data: reading2025 } = await useAsyncData("reading-2025", () =>
  queryContent("/reading-2025").findOne()
);
const { data: readingShelf } = await useAsyncData("reading-shelf", () =>
  queryContent("/reading-shelf").findOne()
);

const modes = [
  { key: "shelf", label: "Shelf" },
  { key: "list", label: "List" },
];
const mode = ref<"shelf" | "list">("shelf");

// the ::book entries in each content file, top shelf first
const booksIn = (doc: any) =>
  (doc?.body?.children ?? []).filter((n: any) => n.tag === "book").map((n: any) => n.props);
const shelves = computed(() => [
  { label: "2026", books: booksIn(reading2026.value) },
  { label: "2025", books: booksIn(reading2025.value) },
  { label: "On the shelf", books: booksIn(readingShelf.value) },
]);

useSeoMeta({
  title: "Reading | Vishnu Jayadevan",
  description: "Books I'm reading, have read, or have on the shelf.",
  ogTitle: "Reading | Vishnu Jayadevan",
  ogDescription: "Books I'm reading, have read, or have on the shelf.",
});
</script>
