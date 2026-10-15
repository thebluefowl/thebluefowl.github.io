<template>
  <ManuscriptShell wide>
    <section class="pt-6 md:pt-10 pb-12">
      <p class="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-gray-600 mb-6">Error {{ error.statusCode }}</p>
      <h1 class="font-garamond font-normal text-[40px] md:text-[56px] lg:text-[76px] leading-[1.06] tracking-[-0.02em] max-w-[900px] m-0">
        {{ error.statusCode === 404 ? "This page isn't here." : 'Oops! Something went wrong.' }}
      </h1>
      <p class="text-[18px] md:text-[22px] italic leading-[1.45] text-gray-800 max-w-[62ch] mt-6">
        {{ error.statusCode === 404 ? 'It may have moved, or it may never have existed.' : error.message }}
      </p>
      <nuxt-link to="/" class="inline-block mt-10 font-mono text-[12px] tracking-[0.08em] uppercase text-black hover:text-slate-500 transition-colors">&larr; Back home</nuxt-link>
    </section>
  </ManuscriptShell>
</template>

<script setup>
const props = defineProps(['error'])
useSeoMeta({
  title: () => `${props.error.statusCode ?? 'Error'} | Vishnu Jayadevan`,
})
</script>
