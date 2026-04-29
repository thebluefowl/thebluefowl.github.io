<template>
  <ManuscriptShell>
    <Folio page-label="Uses" subtitle="Tools, software, and bits of hardware I reach for" />

    <p class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]">
      A
      <a href="https://uses.tech" target="_blank" rel="noopener" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">/uses</a>
      page. The setup behind everything else on this site.
    </p>

    <template v-for="(g, gi) in groups" :key="g.title">
      <SectionHead :num="g.num" :title="g.title" />
      <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
        <li v-for="row in g.rows" :key="row.k" class="flex items-baseline">
          <span class="font-garamond text-[22px] font-medium text-black shrink-0">{{ row.k }}</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
          <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">{{ row.v }}</span>
        </li>
      </ul>
    </template>

    <Signoff><em>last updated April 2026</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Uses | Vishnu Jayadevan",
  description: "Tools, software, and hardware I reach for every day.",
  ogTitle: "Uses | Vishnu Jayadevan",
  ogDescription: "Tools, software, and hardware I reach for every day.",
});

const groups = [
  {
    num: "I",
    title: "Editor & terminal",
    rows: [
      { k: "Editor", v: "Neovim. VS Code in someone else's repo." },
      { k: "Terminal", v: "Ghostty" },
      { k: "Shell", v: "Fish" },
      { k: "Multiplexer", v: "Tmux, when I have to" },
    ],
  },
  {
    num: "II",
    title: "Languages",
    rows: [
      { k: "At work", v: "Go and Python" },
      { k: "On the frontend", v: "TypeScript" },
      { k: "Glue", v: "Bash, when avoiding it would take longer" },
    ],
  },
  {
    num: "III",
    title: "This website",
    rows: [
      { k: "Framework", v: "Nuxt 3 with @nuxt/content" },
      { k: "Styling", v: "Tailwind, no UI kit" },
      { k: "Type", v: "EB Garamond, Noto Serif Malayalam, IBM Plex Sans" },
      { k: "Hosting", v: "GitHub Pages" },
    ],
  },
  {
    num: "IV",
    title: "Hardware",
    rows: [
      { k: "Laptop", v: "MacBook Pro, Apple silicon" },
      { k: "Display", v: '27" 4K external' },
      { k: "Keyboard", v: "Mechanical with tactile switches" },
    ],
  },
];
</script>
