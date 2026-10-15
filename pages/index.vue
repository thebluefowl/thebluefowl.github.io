<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 pb-[72px]">
      <h1 class="font-garamond font-normal text-[clamp(30px,3.8vw,48px)] leading-[1.2] tracking-[-0.012em] max-w-[960px] m-0">
        Hello, I am <em>Vishnu Jayadevan.</em>
        <span class="text-gray-600">I build software. I have opinions about how it should be built. Sometimes I write those opinions down. <em>Occasionally, I ramble about other things.</em></span>
      </h1>
      <div class="flex flex-wrap gap-x-8 gap-y-2 mt-12 font-mono text-[13px] text-gray-600">
        <span>Staff Software Engineer, Harness</span>
        <span>Previously DeepSource, six years</span>
        <span>Bangalore, IN · <a href="https://www.google.com/maps/place/12.97,77.59/@12.97,77.59,5z" target="_blank" rel="noopener" class="underline decoration-1 underline-offset-[3px] hover:text-slate-500 transition-colors">12.97° N, 77.59° E</a></span>
      </div>
    </section>

    <div class="grid gap-12 md:grid-cols-3 border-t border-black pt-7">
      <section>
        <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">Latest writing</h2>
        <NuxtLink v-if="latest" :to="latest._path" class="block">
          <span class="block text-[28px] leading-[1.15] font-medium">{{ latest.title }}</span>
        </NuxtLink>
        <template v-if="latest">
          <p class="text-[18px] leading-[1.5] text-gray-800 mt-3.5">{{ latest.description }}</p>
          <p class="font-mono text-[12px] text-gray-600 mt-3.5">{{ usePrettyDate(latest.date) }} · {{ latest.category }}</p>
        </template>
      </section>

      <section>
        <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">Now · {{ now?.updated }}</h2>
        <p class="text-[18px] leading-[1.5] text-[#333] m-0">{{ now?.summary }}</p>
        <NuxtLink to="/now" class="inline-block mt-3.5 font-mono text-[12px] text-gray-600 hover:text-slate-500 transition-colors">Read more &rarr;</NuxtLink>
      </section>

      <section>
        <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-5">On the shelf</h2>
        <p v-for="b in books" :key="b.title" class="text-[18px] leading-[1.35] mb-4">
          <em class="text-[22px]">{{ b.title }}</em><br /><span class="text-gray-600">{{ b.by }}</span>
        </p>
      </section>
    </div>

    <section class="mt-24 border-t border-black pt-7">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-7">Contents</h2>
      <div class="grid md:grid-cols-2 md:gap-x-16">
        <NuxtLink v-for="([to, label, desc], i) in contents" :key="to" :to="to" class="flex items-baseline gap-5 py-4 border-b border-gray-200 group">
          <span class="font-mono text-[12px] text-gray-600 w-6 shrink-0">{{ String(i + 1).padStart(2, "0") }}</span>
          <span class="font-garamond text-[34px] leading-none text-black group-hover:text-slate-500 transition-colors">{{ label }}</span>
          <span class="hidden sm:inline ml-auto italic text-gray-600 text-[17px] text-right">{{ desc }}</span>
        </NuxtLink>
      </div>
    </section>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({
  documentDriven: { page: false, surround: false },
});

const { data: latest } = await useAsyncData("home-latest", () =>
  queryContent("/blog").sort({ date: -1 }).limit(1).find().then((r) => r[0]),
);
const { data: now } = await useAsyncData("home-now", () => queryContent("/now").findOne());
const { data: reading } = await useAsyncData("home-reading", () => queryContent("/reading").findOne());

const books = computed(() =>
  (reading.value?.body?.children ?? []).filter((n: any) => n.tag === "book").slice(0, 2).map((n: any) => {
    const { title, author, status, stars } = n.props;
    const trail = status === "in-progress" ? "in progress" : stars ? "★".repeat(Math.floor(stars)) + (stars % 1 ? "½" : "") : "";
    return { title, by: [author, trail].filter(Boolean).join(" · ") };
  }),
);

const contents = [
  ["/about", "About", "The longer version"],
  ["/blog", "Blog", "Systems, software, the rest"],
  ["/reading", "Reading", "A running list, with stars"],
  ["/now", "Now", "What I'm focused on"],
  ["/uses", "Uses", "Tools I reach for"],
  ["/elsewhere", "Elsewhere", "The rest of the internet"],
];

useSeoMeta({
  title: "Vishnu Jayadevan | Software Engineer & Engineering Leader",
  description:
    "Software engineer and engineering leader in Bangalore, India. I build systems, lead teams, and work across distributed systems, developer tools, and AI.",
  ogTitle: "Vishnu Jayadevan | Software Engineer & Engineering Leader",
  ogDescription:
    "Software engineer and engineering leader in Bangalore, India. I build systems, lead teams, and work across distributed systems, developer tools, and AI.",
});
</script>
