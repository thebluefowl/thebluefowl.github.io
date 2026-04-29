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
    </div>

    <ContentDoc class="prose-post max-w-none" />

    <Signoff><em>V.J., {{ usePrettyDate(page.date) }}</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
const { page } = useContent();

useHead({
  title: page?.value?.title || "Blog Post",
  meta: [
    { name: "description", content: page?.value?.description || "Blog Post" },
    { property: "og:title", content: page?.value?.title || "Blog Post" },
    { property: "og:description", content: page?.value?.description || "Blog Post" },
    { property: "og:type", content: "article" },
    { name: "twitter:title", content: page?.value?.title || "Blog Post" },
    { name: "twitter:description", content: page?.value?.description || "Blog Post" },
  ],
});
</script>

<style>
.prose-post {
  margin: 48px auto 0;
  max-width: 64ch;
  font-family: "EB Garamond", Georgia, serif;
  font-size: 19px;
  line-height: 1.7;
  color: #1f2937;
}
.prose-post > * + * { margin-top: 0.7em; }
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
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 16px 18px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
  margin: 1.2em 0;
  overflow: auto;
}
.prose-post code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.92em;
}
.prose-post pre code {
  font-size: 13px;
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
</style>
