<template>
  <ManuscriptShell>
    <Folio page-label="Blog" subtitle="All posts, in chronological order" />

    <div class="grid grid-cols-[auto_1fr] gap-7 items-start">
      <span
        class="font-garamond font-medium text-[140px] md:text-[200px] leading-[0.78] tracking-[-0.04em] text-black -mt-2 select-none"
        aria-hidden="true"
      >F</span>
      <p class="font-garamond text-[22px] md:text-[26px] leading-[1.4] text-black m-0">
        <span class="italic">ragments</span> collected since 2018. Long-form when the topic earns it,
        short when it doesn't. Distributed systems mostly, with the occasional detour into
        <em class="italic">biology</em>, <em class="italic">aquariums</em>, or <em class="italic">trains</em>.
      </p>
    </div>

    <div v-for="(group, gi) in years" :key="group.year" :class="{ 'mt-14 pt-10 border-t border-gray-300': gi > 0, 'mt-14': gi === 0 }">
      <div class="flex items-baseline mb-2">
        <span class="font-garamond italic text-[22px] text-gray-600 shrink-0">{{ group.year }}</span>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">{{ group.posts.length }} {{ group.posts.length === 1 ? 'entry' : 'entries' }}</span>
      </div>
      <ol class="list-none m-0 p-0 border-t border-gray-200">
        <li v-for="(p, i) in group.posts" :key="p._path" class="grid grid-cols-[56px_1fr] items-baseline border-b border-gray-200 group">
          <span class="font-garamond italic text-[18px] text-gray-500 py-5">{{ romans[i] }}.</span>
          <NuxtLink :to="p._path" class="flex flex-col gap-2 py-5 no-underline text-inherit">
            <span class="font-garamond text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.005em] text-black transition-colors duration-300 group-hover:text-slate-500">
              {{ p.title }}
            </span>
            <span class="flex flex-wrap gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500">
              <span>{{ usePrettyDate(p.date) }}</span>
              <span class="text-gray-300">&middot;</span>
              <span>{{ p.category }}</span>
            </span>
          </NuxtLink>
        </li>
      </ol>
    </div>

    <Signoff><em>subscribe via <a href="/rss.xml" class="hover:text-slate-500 transition-colors">/rss.xml</a></em></Signoff>
  </ManuscriptShell>
</template>


<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "Blog | Vishnu Jayadevan",
  description: "Articles on software engineering, distributed systems, and technology leadership.",
  ogTitle: "Blog | Vishnu Jayadevan",
  ogDescription: "Articles on software engineering, distributed systems, and technology leadership.",
});

const { data: posts } = await useAsyncData("blog-index", () =>
  queryContent("/blog").sort({ date: -1 }).find()
);

const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv"];

const years = computed(() => {
  const map = new Map<string, ParsedContent[]>();
  posts.value?.forEach((p: ParsedContent) => {
    const y = p.date ? new Date(p.date).getFullYear().toString() : "Undated";
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  });
  return Array.from(map.entries()).map(([year, posts]) => ({ year, posts }));
});
</script>
