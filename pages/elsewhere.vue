<template>
  <ManuscriptShell>
    <Folio page-label="Elsewhere" subtitle="Where to find me on the rest of the internet" />

    <p class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]">
      The site is the canonical version, but I'm reachable in a few other places.
      <em class="italic">Email is best for anything important.</em>
      Replies are not guaranteed to be quick. Usually within the week.
    </p>

    <template v-for="(group, gi) in groups" :key="group.title">
      <SectionHead :num="group.num" :title="group.title" />
      <ul class="list-none m-0 p-0 flex flex-col gap-[18px]">
        <li v-for="r in group.rows" :key="r.label" class="flex items-baseline">
          <a
            :href="r.href"
            :target="r.external ? '_blank' : undefined"
            :rel="r.external ? 'noopener' : undefined"
            class="shrink-0 text-black no-underline hover:text-slate-500 transition-colors"
          >
            <span class="font-garamond text-[24px] md:text-[28px] font-medium tracking-[-0.005em]">{{ r.label }}</span>
            <span v-if="r.handle" class="ml-3 align-middle font-sans text-[12px] tracking-[0.04em] text-gray-500">{{ r.handle }}</span>
          </a>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
          <span class="font-garamond italic text-[16px] md:text-[17px] text-gray-600 shrink-0">{{ r.hint }}</span>
        </li>
      </ul>
    </template>

    <Signoff><em>last verified April 2026</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Elsewhere | Vishnu Jayadevan",
  description: "Where to find me on the rest of the internet.",
  ogTitle: "Elsewhere | Vishnu Jayadevan",
  ogDescription: "Where to find me on the rest of the internet.",
});

const groups = [
  {
    num: "I",
    title: "For code",
    rows: [
      { label: "GitHub", handle: "@thebluefowl", hint: "Open source, side projects, dotfiles", href: "https://github.com/thebluefowl", external: true },
    ],
  },
  {
    num: "II",
    title: "For people",
    rows: [
      { label: "Email", handle: "hi@vishnujayadevan.com", hint: "Best way to reach me. Plain text preferred.", href: "mailto:hi@vishnujayadevan.com", external: false },
      { label: "LinkedIn", handle: "/in/vishnujayadevan", hint: "The long-form CV.", href: "https://www.linkedin.com/in/vishnujayadevan/", external: true },
    ],
  },
  {
    num: "III",
    title: "For the rest",
    rows: [
      { label: "RSS", handle: "/rss.xml", hint: "If you'd rather not check the site.", href: "/rss.xml", external: false },
    ],
  },
];
</script>
