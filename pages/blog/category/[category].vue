<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 pb-10">
      <h1 class="font-garamond font-normal text-[40px] md:text-[56px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] max-w-[900px] m-0">{{ category }}</h1>
      <NuxtLink to="/blog" class="inline-block mt-6 font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 hover:text-slate-500 transition-colors">&larr; All posts</NuxtLink>
    </section>

    <div class="border-t border-black">
      <NuxtLink v-for="p in posts" :key="p._path" :to="p._path" class="block group border-b border-gray-200 py-6">
        <span class="block font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-2.5">{{ p.kind === 'personal' ? 'Personal' : 'Software' }}</span>
        <span class="block text-[24px] md:text-[28px] leading-[1.15] font-medium group-hover:text-slate-500 transition-colors">{{ p.title }}</span>
        <span v-if="p.description" class="block text-[17px] md:text-[18px] leading-[1.5] text-gray-800 mt-3 max-w-[760px]">{{ p.description }}</span>
        <span class="block font-mono text-[12px] md:text-[13px] text-gray-600 mt-3">{{ usePrettyDate(p.date) }} · {{ p.category }}</span>
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
</script>
