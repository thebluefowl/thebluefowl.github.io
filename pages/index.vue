<template>
  <NuxtLayout name="content">
    <template #body>
      <div class="w-full pt-16 md:pt-24 pb-16">
        <section class="mb-20">
          <h1 class="text-3xl md:text-4xl font-garamond leading-relaxed">
            Hi, I am <span class="font-semibold">Vishnu Jayadevan</span>.
          </h1>
          <p class="mt-6 text-lg md:text-xl font-garamond leading-relaxed text-gray-800">
            Software engineer based out of Bangalore, India. I lead product engineering at
            <a
              href="https://deepsource.com"
              class="underline hover:text-gray-600 transition-colors"
              >DeepSource</a
            >, where we build tools for code quality and security. Previously at
            <a
              href="https://exotel.com"
              class="underline hover:text-gray-600 transition-colors"
              >Exotel</a
            >, building enterprise telephony.
          </p>
          <p class="mt-4 text-lg md:text-xl font-garamond leading-relaxed text-gray-800">
            I write here about distributed systems, software architecture, and the occasional detour into
            biochemistry, aquascaping, or travel. Some posts are in Malayalam.
          </p>

          <div class="mt-8 flex items-center gap-5">
            <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-slate-700 inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wider">
              <Icon name="mdi:github" class="w-5 h-5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:text-slate-700 inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wider">
              <Icon name="mdi:linkedin" class="w-5 h-5" /> LinkedIn
            </a>
            <a href="/rss.xml" aria-label="RSS" class="hover:text-slate-700 inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wider">
              <Icon name="mdi:rss" class="w-5 h-5" /> RSS
            </a>
          </div>
        </section>

        <section class="mb-20">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Currently</h2>
          <ul class="font-garamond text-lg leading-relaxed space-y-1.5">
            <li><span class="text-gray-500 inline-block w-28">Working on</span> product and platform engineering at DeepSource</li>
            <li><span class="text-gray-500 inline-block w-28">Reading</span> <em>Eurotrash</em> by Christian Kracht</li>
            <li><span class="text-gray-500 inline-block w-28">Writing</span> about distributed systems and the math underneath them</li>
            <li><span class="text-gray-500 inline-block w-28">Living in</span> Bangalore</li>
          </ul>
          <p class="mt-3 text-sm text-gray-500 font-garamond">
            More on the <NuxtLink to="/now" class="underline hover:text-gray-700">/now page</NuxtLink>.
          </p>
        </section>

        <section class="mb-20" v-if="latestPost">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">Latest writing</h2>
          <NuxtLink :to="latestPost._path" class="block group">
            <div class="font-garamond text-2xl md:text-3xl group-hover:text-slate-700">
              {{ latestPost.title }}
            </div>
            <div class="font-garamond text-base text-gray-600 mt-2">
              {{ latestPost.description }}
            </div>
            <div class="font-sans text-xs uppercase tracking-wider text-gray-500 mt-3">
              {{ usePrettyDate(latestPost.date) }} &middot; {{ latestPost.category }}
            </div>
          </NuxtLink>
          <div class="mt-6">
            <NuxtLink to="/blog" class="font-sans text-xs uppercase tracking-wider hover:text-slate-700 inline-flex items-center gap-1">
              All writing <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4">On the shelf</h2>
          <ul class="font-garamond text-lg space-y-1">
            <li v-for="b in shelfPreview" :key="b.title" class="flex items-baseline gap-2">
              <span>{{ b.title }}</span>
              <span class="text-gray-500 text-base">by {{ b.author }}</span>
            </li>
          </ul>
          <div class="mt-6">
            <NuxtLink to="/reading" class="font-sans text-xs uppercase tracking-wider hover:text-slate-700 inline-flex items-center gap-1">
              Full reading list <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  documentDriven: {
    page: false,
    surround: false,
  },
});

useSeoMeta({
  title: "Vishnu Jayadevan | Software Engineer & Writer",
  description:
    "Software engineer and writer based in Bangalore, India. Leading engineering at DeepSource, building tools for better code. Writing about distributed systems and software architecture.",
  ogTitle: "Vishnu Jayadevan | Software Engineer & Writer",
  ogDescription:
    "Software engineer and writer based in Bangalore, India. Leading engineering at DeepSource.",
});

const { data: latestPost } = await useAsyncData("home-latest-post", () =>
  queryContent("/blog").sort({ date: -1 }).limit(1).findOne()
);

const shelfPreview = [
  { title: "Hotel du Lac", author: "Anita Brookner" },
  { title: "The Art of Travel", author: "Alain de Botton" },
  { title: "On Earth We're Briefly Gorgeous", author: "Ocean Vuong" },
  { title: "The Covenant of Water", author: "Abraham Verghese" },
];
</script>
