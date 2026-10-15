<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 pb-10">
      <h1 class="font-garamond font-normal text-[clamp(40px,6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[980px] m-0">
        Notes on software, systems, and whatever else I’m thinking about.
      </h1>
    </section>

    <div role="group" aria-label="Filter posts" class="flex flex-wrap items-center gap-2 mb-10 font-mono text-[12px] uppercase tracking-[0.08em]">
      <button
        v-for="f in filters" :key="f.value" type="button" :aria-pressed="kind === f.value" @click="setKind(f.value)"
        :class="['min-h-[44px] px-4 rounded-full border border-black transition-colors', kind === f.value ? 'bg-black text-paper' : 'bg-transparent text-black hover:bg-black/5']"
      >{{ f.label }} <span class="opacity-70">{{ f.count }}</span></button>
    </div>

    <section v-for="(group, gi) in years" :key="group.year" :class="['border-t border-black pt-7', gi > 0 && 'mt-16 md:mt-24']">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">
        {{ group.year }}
      </h2>
      <NuxtLink v-for="p in group.posts" :key="p._path" :to="p._path" class="block group border-b border-[#ddd8cf] py-5">
        <span class="block font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-2.5">{{ p.kind === 'personal' ? 'Personal' : 'Software' }}</span>
        <span class="block text-[28px] leading-[1.15] font-medium group-hover:text-slate-500 transition-colors">{{ p.title }}</span>
        <span v-if="p.description" class="block text-[18px] leading-[1.5] text-[#333] mt-3.5 max-w-[760px]">{{ p.description }}</span>
        <span class="block font-mono text-[12px] text-gray-600 mt-3.5">{{ usePrettyDate(p.date) }}</span>
      </NuxtLink>
    </section>

    <p v-if="!shown.length" class="m-0 py-5 text-[20px] italic text-gray-600 border-b border-[#ddd8cf]">Nothing personal here yet.</p>
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

const kindOf = (p: ParsedContent) => (p.kind === "personal" ? "personal" : "software");
// Hydration starts at the prerendered path (/blog, no query); the router then moves to the real URL, so derive from it.
const route = useRoute();
const kind = computed(() => {
  const q = route.query.kind;
  return q === "personal" || q === "software" ? q : "all";
});
const setKind = (v: string) =>
  navigateTo({ query: v === "all" ? {} : { kind: v } }, { replace: true });
const filters = computed(() =>
  [["all", "All"], ["software", "Software"], ["personal", "Personal"]].map(([value, label]) => ({
    value, label,
    count: value === "all" ? posts.value?.length ?? 0 : posts.value?.filter((p) => kindOf(p) === value).length ?? 0,
  }))
);
const shown = computed(() => (posts.value ?? []).filter((p: ParsedContent) => kind.value === "all" || kindOf(p) === kind.value));

const years = computed(() => {
  const map = new Map<string, ParsedContent[]>();
  shown.value.forEach((p: ParsedContent) => {
    const y = p.date ? new Date(p.date).getFullYear().toString() : "Undated";
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  });
  return Array.from(map.entries()).map(([year, posts]) => ({ year, posts }));
});
</script>
