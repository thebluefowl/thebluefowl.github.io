<template>
  <ManuscriptShell>
    <Folio page-label="Blog" :subtitle="`Filed under ${category}`" />

    <ol class="list-none m-0 p-0 border-t border-gray-200 mt-6">
      <li v-for="(p, i) in posts" :key="p._path" class="grid grid-cols-[56px_1fr] items-baseline border-b border-gray-200 group">
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

    <div class="mt-8">
      <NuxtLink to="/blog" class="font-sans text-[12px] tracking-[0.04em] text-black no-underline border-b border-black pb-0.5 inline-block hover:text-slate-500 hover:border-slate-500 transition-colors">
        &larr; All posts
      </NuxtLink>
    </div>

    <Signoff><em>filed under <span class="not-italic">{{ category }}</span></em></Signoff>
  </ManuscriptShell>
</template>


<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

const route = useRoute();
const category = Array.isArray(route.params.category)
  ? route.params.category.join(",")
  : (route.params.category as string);

useSeoMeta({
  title: `${category} | Vishnu Jayadevan`,
  description: `Posts filed under ${category}.`,
});

const { data: posts } = await useAsyncData(`blog-cat-${category}`, () =>
  queryContent("/blog").where({ category: { $icontains: category } }).sort({ date: -1 }).find()
);

const romans = ["i","ii","iii","iv","v","vi","vii","viii","ix","x","xi","xii","xiii","xiv","xv"];
</script>
