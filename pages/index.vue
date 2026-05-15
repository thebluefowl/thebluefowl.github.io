<template>
  <ManuscriptShell>
    <Folio page-label="Page i" subtitle="Ch. I. A short introduction" />

    <div class="grid grid-cols-[auto_1fr] gap-7 items-start">
          <span
            class="font-garamond font-medium text-[160px] md:text-[200px] lg:text-[240px] leading-[0.78] tracking-[-0.04em] text-black -mt-2 select-none"
            aria-hidden="true"
          >H</span>
          <p class="font-garamond text-[24px] md:text-[28px] leading-[1.35] text-black m-0">
            <span class="italic">i, I am</span>
            <span class="font-semibold">Vishnu Jayadevan</span><span class="font-semibold">.</span>
            A software engineer based out of Bangalore, India. I lead product engineering at
            <a href="https://deepsource.com" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">DeepSource</a>,
            where we build tools for code quality and security. Previously at
            <a href="https://exotel.com" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">Exotel</a>,
            building enterprise telephony.
          </p>
        </div>

        <p class="font-garamond text-[18px] md:text-[19px] leading-[1.6] text-gray-800 mt-8 max-w-[560px] md:pl-[228px]">
          I write here about distributed systems and software architecture, with the
          occasional detour through aquariums and slow trains. Some posts are in Malayalam,
          for folks back home.
        </p>

        <div class="relative my-10 md:my-12 h-px bg-gray-200">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500 text-sm">❦</span>
        </div>

        <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium mb-4">
          Contents of this site
        </div>

        <ol class="list-none m-0 p-0 flex flex-col gap-3.5">
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">i.</span>
            <NuxtLink to="/about" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">About</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">A longer version of the above.</span>
          </li>
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">ii.</span>
            <NuxtLink to="/blog" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">Blog</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">Notes on systems, software, and the rest.</span>
          </li>
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">iii.</span>
            <NuxtLink to="/reading" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">Reading</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">A running list, with stars.</span>
          </li>
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">iv.</span>
            <NuxtLink to="/now" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">Now</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">What I&rsquo;m up to this month.</span>
          </li>
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">v.</span>
            <NuxtLink to="/uses" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">Uses</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">Tools, software, and hardware I reach for every day.</span>
          </li>
          <li class="group flex items-baseline">
            <span class="font-garamond italic text-[18px] text-gray-600 w-9 shrink-0">vi.</span>
            <NuxtLink to="/elsewhere" class="font-garamond text-[32px] md:text-[40px] font-medium leading-none text-black shrink-0 transition-colors group-hover:italic group-hover:text-slate-500">Elsewhere</NuxtLink>
            <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
            <span class="font-garamond italic text-[16px] text-gray-600 shrink-0">The rest of the internet.</span>
          </li>
        </ol>

    <Signoff><em>V.J., Bangalore</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({
  documentDriven: { page: false, surround: false },
});

useSeoMeta({
  title: "Vishnu Jayadevan | Software Engineer & Writer",
  description:
    "Software engineer in Bangalore, India. Writing about distributed systems and software architecture, with occasional detours through aquariums and slow trains.",
  ogTitle: "Vishnu Jayadevan | Software Engineer & Writer",
  ogDescription:
    "Software engineer in Bangalore, India. Writing about distributed systems and software architecture, with occasional detours through aquariums and slow trains.",
});
</script>
