<template>
  <ManuscriptShell>
    <div class="mb-14">
      <div class="flex items-center font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 gap-4 pb-[18px]">
        <span>Vishnu Jayadevan</span>
        <span class="flex-1 border-b border-dotted border-gray-300 self-end mb-1 h-px"></span>
        <span>{{ usePrettyDate(page.date) }} . {{ page.category }}</span>
      </div>
      <h1 class="font-garamond font-normal text-[clamp(48px,7.5vw,112px)] leading-[0.96] tracking-[-0.03em] m-0 pb-7 border-b border-black">
        {{ page.title }}
      </h1>
      <p
        v-if="page.description"
        class="font-garamond italic text-[22px] md:text-[26px] leading-[1.4] text-gray-600 m-0 mt-10 max-w-[60ch] mx-auto text-center"
      >
        {{ page.description }}
      </p>
    </div>

    <ContentDoc class="prose-post" />

    <section v-if="related && related.length" class="mt-16 pt-10 border-t border-black">
      <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium mb-6">Continued in</div>
      <ol class="list-none m-0 p-0 flex flex-col gap-3">
        <li v-for="(p, i) in related" :key="p._path" class="flex items-baseline">
          <span class="font-garamond italic text-[18px] text-gray-500 w-9 shrink-0">{{ romans[i] }}.</span>
          <NuxtLink :to="p._path" class="font-garamond text-[20px] md:text-[22px] font-medium leading-tight text-black shrink-0 no-underline hover:italic hover:text-slate-500 transition-colors">
            {{ p.title }}
          </NuxtLink>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
          <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">
            {{ usePrettyDate(p.date) }} . {{ p.category }}
          </span>
        </li>
      </ol>
    </section>

    <Signoff><em>V.J., {{ usePrettyDate(page.date) }}</em></Signoff>
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

const romans = ["i", "ii", "iii", "iv", "v"];

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
const ogUrl = computed(() => `${SITE}${route.path}`);
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
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
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
  margin: 24px auto 0;
  max-width: 88ch;
  font-family: "EB Garamond", Georgia, serif;
  font-size: 19px;
  line-height: 1.7;
  color: #1f2937;
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
.prose-post > * + * { margin-top: 0.7em; }
.prose-post > p:first-of-type::first-letter {
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 5.4em;
  line-height: 0.86;
  float: left;
  padding: 4px 12px 0 0;
  margin-top: 6px;
  color: #000;
}
.prose-post > h2:first-child,
.prose-post > h3:first-child {
  margin-top: 0;
}
.prose-post h2 {
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 1.4em 0 0.4em;
  color: #000;
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
  border: 1px solid #e5e7eb;
  padding: 16px 18px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
  margin: 1.4em 0;
  overflow: auto;
}
/* Shiki applies a background via inline style on <pre>; if it's missing fall back to ours */
.prose-post pre:not([style*="background"]) {
  background: #f9fafb;
}
.prose-post :not(pre) > code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.85em;
  background: #fdf6f0;
  border: 1px solid #ead9c8;
  padding: 1px 6px;
  border-radius: 3px;
  color: #6b3f2a;
  white-space: nowrap;
}
.prose-post pre {
  /* reset for nested pre code */
}
.prose-post pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
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
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #6b7280;
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
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 1px 5px;
  border-radius: 2px;
}
</style>
