<template>
  <div class="min-h-screen flex flex-col font-garamond">
    <Header />
    <main class="flex-grow w-full pt-16 px-6 sm:px-10 md:px-16 lg:px-20 flex justify-center">
      <div class="w-full max-w-[1280px] flex flex-col justify-center min-h-[calc(100vh-12rem)] py-10 md:py-14">
        <h1
          class="border-y border-black flex items-center justify-center overflow-hidden py-6 m-0"
          aria-label="Vishnu Jayadevan"
        >
          <span class="font-garamond font-semibold whitespace-nowrap inline-block max-w-full text-[clamp(48px,9.5vw,132px)] leading-[0.95] tracking-[-0.04em]">
            Vishnu&nbsp;Jayadevan
          </span>
        </h1>

        <div class="mt-4 flex items-center w-full font-sans text-[12px] uppercase tracking-[0.18em] text-gray-500">
          <span>Software engineer</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-4"></span>
          <span>Bangalore, IN</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-4"></span>
          <span>{{ year }} ed.</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-4"></span>
          <span>vishnujayadevan.com</span>
        </div>

        <div class="mt-12 pt-12 grid grid-cols-1 xl:grid-cols-[1fr_1.4fr_1fr] gap-10 xl:gap-14">
          <section class="flex flex-col gap-3.5">
            <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Currently</div>
            <ul class="list-none m-0 p-0 flex flex-col gap-1.5">
              <li class="flex items-baseline">
                <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-gray-500 shrink-0">Working on</span>
                <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
                <b class="font-garamond font-medium text-[17px] text-black shrink-0">
                  <a href="https://deepsource.com" class="text-inherit no-underline hover:text-slate-500 transition-colors">DeepSource</a>
                </b>
              </li>
              <li class="flex items-baseline">
                <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-gray-500 shrink-0">Reading</span>
                <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
                <b class="font-garamond font-medium text-[17px] text-black shrink-0"><em>Eurotrash</em></b>
              </li>
              <li class="flex items-baseline">
                <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-gray-500 shrink-0">Writing</span>
                <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
                <b class="font-garamond font-medium text-[17px] text-black shrink-0">Distributed systems</b>
              </li>
              <li class="flex items-baseline">
                <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-gray-500 shrink-0">Living in</span>
                <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
                <b class="font-garamond font-medium text-[17px] text-black shrink-0">Bangalore</b>
              </li>
            </ul>
          </section>

          <section class="flex flex-col gap-3.5">
            <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Latest writing</div>
            <NuxtLink
              v-if="latestPost"
              :to="latestPost._path"
              class="group block no-underline text-black mb-3.5 flex flex-col gap-1.5"
            >
              <span class="font-garamond text-[22px] leading-[1.25] font-medium transition-colors group-hover:text-slate-500">
                {{ latestPost.title }}
              </span>
              <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-gray-500">
                {{ usePrettyDate(latestPost.date) }} &middot; {{ latestPost.category }}
              </span>
            </NuxtLink>
            <NuxtLink
              to="/blog"
              class="font-sans text-[12px] tracking-[0.04em] text-black no-underline border-b border-black pb-0.5 inline-block w-max transition-colors hover:text-slate-500 hover:border-slate-500"
            >
              All writing &rarr;
            </NuxtLink>
          </section>

          <section class="flex flex-col gap-3.5">
            <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Elsewhere</div>
            <ul class="list-none m-0 p-0 flex flex-col gap-2">
              <li>
                <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" class="font-garamond text-[22px] text-black no-underline border-b border-transparent hover:border-black transition-colors w-max inline-block">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener" class="font-garamond text-[22px] text-black no-underline border-b border-transparent hover:border-black transition-colors w-max inline-block">LinkedIn</a>
              </li>
              <li>
                <a href="mailto:hi@vishnujayadevan.com" class="font-garamond text-[22px] text-black no-underline border-b border-transparent hover:border-black transition-colors w-max inline-block">Email</a>
              </li>
              <li>
                <a href="/rss.xml" class="font-garamond text-[22px] text-black no-underline border-b border-transparent hover:border-black transition-colors w-max inline-block">RSS</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  documentDriven: { page: false, surround: false },
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

const year = new Date().getFullYear();
</script>
