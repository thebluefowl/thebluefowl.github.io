<template>
  <ManuscriptShell wide>
    <header class="pt-6 md:pt-10 pb-10 mb-10 border-b border-black">
      <p class="font-mono text-[12px] text-gray-600 m-0">
        {{ usePrettyDate(page.date) }} ·
        <NuxtLink :to="`/blog/category/${encodeURIComponent(page.category)}`" class="hover:text-slate-500 transition-colors">{{ page.category }}</NuxtLink>
      </p>
      <h1 class="font-garamond font-normal text-[clamp(36px,5.5vw,56px)] leading-[1.08] tracking-[-0.02em] max-w-[900px] mt-6 mb-0">
        {{ page.title }}
      </h1>
      <p v-if="page.description || page.subtitle" class="text-[22px] leading-[1.45] italic text-[#333] max-w-[760px] mt-6 mb-0">
        {{ page.description || page.subtitle }}
      </p>
    </header>

    <ContentDoc class="prose-post" />

    <section v-if="related && related.length" class="mt-16 pt-7 border-t border-black">
      <h2 class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-2">Continued in</h2>
      <NuxtLink v-for="p in related" :key="p._path" :to="p._path" class="block group border-b border-gray-200 py-6">
        <span class="block font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-2.5">{{ p.kind === 'personal' ? 'Personal' : 'Software' }}</span>
        <span class="block text-[24px] md:text-[28px] leading-[1.15] font-medium group-hover:text-slate-500 transition-colors">{{ p.title }}</span>
        <span v-if="p.description" class="block text-[17px] md:text-[18px] leading-[1.5] text-gray-800 mt-2">{{ p.description }}</span>
        <span class="block font-mono text-[12px] md:text-[13px] text-gray-600 mt-2">{{ usePrettyDate(p.date) }} · {{ p.category }}</span>
      </NuxtLink>
    </section>

    <div class="flex flex-wrap justify-end items-baseline gap-x-6 gap-y-3 mt-16 pt-5 border-t border-[#ddd8cf] font-mono text-[12px] uppercase tracking-[0.08em]">
      <NuxtLink to="/blog" class="hover:text-slate-500 transition-colors">&larr; Back to Blog</NuxtLink>
    </div>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const route = useRoute();

const { data: page } = await useAsyncData(
  () => `blog-page-${route.path}`,
  () => queryContent(route.path).findOne(),
  { watch: [() => route.path] }
);

const { data: related } = await useAsyncData(
  () => `blog-related-${route.path}`,
  () =>
    queryContent("/blog")
      .where({ category: page.value?.category, _path: { $ne: route.path } })
      .sort({ date: -1 })
      .limit(3)
      .find(),
  { watch: [() => route.path] }
);

const SITE = "https://vishnujayadevan.com";
const absUrl = (path?: string) => {
  if (!path) return `${SITE}/og.png`;
  if (path.startsWith("http")) return path;
  return `${SITE}${path.startsWith("/") ? "" : "/"}${path}`;
};

const slug = computed(() => route.path.replace(/^\/blog\//, "").replace(/\/$/, ""));
const ogImage = computed(() =>
  absUrl(page.value?.ogImage || (slug.value ? `/og/${slug.value}.png` : undefined)),
);
const ogUrl = computed(() => {
  const p = route.path.replace(/\/$/, "");
  return `${SITE}${p}`;
});
const ogTitle = computed(() => page.value?.title || "Blog Post");
const ogDescription = computed(
  () => page.value?.description || "Blog Post"
);

useHead({
  title: ogTitle,
  link: [{ rel: "canonical", href: ogUrl }],
  meta: [
    { name: "description", content: ogDescription },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:type", content: "article" },
    { property: "og:url", content: ogUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:width", content: "2400" },
    { property: "og:image:height", content: "1260" },
    { property: "og:image:alt", content: ogTitle },
    {
      property: "article:published_time",
      content: () => page.value?.date || "",
    },
    { property: "article:author", content: "Vishnu Jayadevan" },
    { property: "article:section", content: () => page.value?.category || "" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<style>
.prose-post {
  width: 100%; /* auto margins in the flex-col article disable stretch */
  margin: 0;
  max-width: 680px;
  font-family: "EB Garamond", Georgia, serif;
  font-size: 20px;
  line-height: 1.65;
  color: #111;
}
.prose-post h1 a,
.prose-post h2 a,
.prose-post h3 a,
.prose-post h4 a {
  text-decoration: none;
  color: inherit;
  border: 0;
}
.prose-post h1 a:hover,
.prose-post h2 a:hover,
.prose-post h3 a:hover,
.prose-post h4 a:hover {
  color: #64748b;
}
.prose-post > * { margin: 0 0 1.1em; }
.prose-post > h2:first-child,
.prose-post > h3:first-child {
  margin-top: 0;
}
.prose-post h2 {
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 30px;
  line-height: 1.15;
  margin: 1.8em 0 0.6em;
  color: #111;
}
.prose-post h3 {
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.2;
  margin: 1.2em 0 0.4em;
  color: #000;
}
.prose-post strong { font-weight: 600; }
.prose-post em { font-style: italic; }
.prose-post a {
  color: #000;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color 0.15s ease-out;
}
.prose-post a:hover { color: #64748b; }
.prose-post pre {
  border: 1px solid #e7e2d8;
  padding: 18px 20px;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 1.4em;
  overflow: auto;
}
/* Shiki applies a background via inline style on <pre>; if it's missing fall back to ours */
.prose-post pre:not([style*="background"]) {
  background: #f4f1ea;
}
.prose-post :not(pre) > code {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8em;
  background: #f4f1ea;
  padding: 1px 5px;
  overflow-wrap: anywhere;
}
.prose-post pre {
  /* reset for nested pre code */
}
.prose-post pre code {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 14px;
  background: transparent;
  border: 0;
  padding: 0;
  white-space: pre;
}
.prose-post blockquote {
  margin: 1.2em 0;
  padding: 4px 0 4px 24px;
  border-left: 2px solid #000;
  font-style: italic;
  color: #000;
}
.prose-post ul, .prose-post ol {
  padding-left: 1.5em;
  margin: 0.8em 0;
}
.prose-post ul { list-style: disc; }
.prose-post ol { list-style: decimal; }
.prose-post li { margin: 0.3em 0; }
.prose-post hr {
  border: 0;
  border-top: 1px solid #d1d5db;
  margin: 56px 0 40px;
}
.prose-post img {
  max-width: 100%;
  height: auto;
  margin: 1.5em 0;
}
.prose-post table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin: 1.4em 0;
  font-size: 16px;
  line-height: 1.5;
}
.prose-post thead {
  border-bottom: 1px solid #000;
}
.prose-post th {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #4b5563;
  text-align: left;
  padding: 10px 12px;
}
.prose-post tbody tr {
  border-bottom: 1px solid #e5e7eb;
}
.prose-post td {
  padding: 12px;
  vertical-align: top;
  color: #1f2937;
}
.prose-post th:first-child,
.prose-post td:first-child {
  padding-left: 0;
}
.prose-post th:last-child,
.prose-post td:last-child {
  padding-right: 0;
}
.prose-post td code {
  font-size: 0.88em;
  background: #f4f1ea;
  border: 1px solid #e7e2d8;
  padding: 1px 5px;
  border-radius: 2px;
}
</style>
