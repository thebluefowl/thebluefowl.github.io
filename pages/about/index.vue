<template>
  <ManuscriptShell>
    <Folio page-label="About" subtitle="A longer introduction" />

    <p class="font-garamond text-[22px] md:text-[24px] leading-[1.5] text-black m-0 max-w-[56ch]">
      I'm <strong class="font-semibold">Vishnu Jayadevan</strong>, a software engineer based in Bangalore, India.
      I work at
      <a href="https://deepsource.com" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">DeepSource</a>,
      where I build code-quality and security tools. I write here about distributed systems, software architecture,
      and occasionally about other things I find interesting: biochemistry, aquascaping, travel.
      <em class="italic">Some posts are in Malayalam, for folks back home.</em>
    </p>

    <div class="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">
      <span>Read in</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <div class="flex gap-1">
        <NuxtLink to="/about" class="px-2 py-1 border border-black bg-black text-white">EN</NuxtLink>
        <NuxtLink to="/about/malayalam" class="px-2 py-1 border border-transparent hover:border-gray-300 hover:text-black transition-colors">ML</NuxtLink>
      </div>
    </div>

    <SectionHead num="I" title="Career" />
    <div class="flex flex-col gap-9">
      <div v-for="job in jobs" :key="job.co" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start">
        <div class="flex flex-col gap-1.5">
          <h3 class="font-garamond font-semibold text-[28px] leading-none tracking-[-0.01em] m-0">{{ job.co }}</h3>
          <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">{{ job.years }}</div>
        </div>
        <div class="flex flex-col gap-[18px] font-garamond">
          <div v-for="role in job.roles" :key="role.title" class="flex flex-col gap-1">
            <div class="flex items-baseline">
              <span class="font-garamond italic font-medium text-[19px] text-black shrink-0">{{ role.title }}</span>
              <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
              <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">{{ role.tag }}</span>
            </div>
            <p class="text-[17px] leading-[1.55] text-gray-800 m-0 max-w-[60ch]">{{ role.body }}</p>
          </div>
        </div>
      </div>
    </div>

    <SectionHead num="II" title="Beyond work" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
      <div v-for="b in beyond" :key="b.h" class="flex flex-col gap-1.5">
        <div class="flex items-baseline">
          <h3 class="font-garamond font-semibold text-[22px] m-0 shrink-0">{{ b.h }}</h3>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        </div>
        <p class="font-garamond text-[16px] leading-[1.55] text-gray-800 m-1 mt-1 max-w-[60ch]">{{ b.p }}</p>
      </div>
    </div>

    <SectionHead num="III" title="Elsewhere" />
    <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3.5">
      <li v-for="e in elsewhere" :key="e.label" class="flex items-baseline">
        <a :href="e.href" :target="e.external ? '_blank' : undefined" :rel="e.external ? 'noopener' : undefined" class="font-garamond text-[24px] font-medium text-black no-underline shrink-0 hover:text-slate-500 transition-colors">{{ e.label }}</a>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">{{ e.hint }}</span>
      </li>
    </ul>

    <Signoff><em>V.J., Bangalore</em></Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "About | Vishnu Jayadevan",
  description: "A longer introduction. Software engineer at DeepSource, based in Bangalore.",
  ogTitle: "About | Vishnu Jayadevan",
  ogDescription: "A longer introduction. Software engineer at DeepSource, based in Bangalore.",
});

const jobs = [
  {
    co: "DeepSource",
    years: "2020 to present",
    roles: [
      {
        title: "Staff Engineer",
        tag: "2024 to present",
        body: "Went back to IC after a stretch in management. Turns out I have more impact with a keyboard than a calendar. Working across product and platform engineering: distributed systems, scaling problems, the sharp edges.",
      },
      {
        title: "Engineering Manager",
        tag: "2022 to 2024",
        body: "Built and led the product, platform and security engineering teams. Spent most of my time hiring, setting technical direction, and trying to stay out of the way.",
      },
      {
        title: "Technical Lead",
        tag: "2020 to 2022",
        body: "The zero-to-one phase. Rewrote the frontend, built reporting, the public API, the CLI, and set up on-premise deployments for enterprise customers.",
      },
    ],
  },
  {
    co: "Exotel",
    years: "2015 to 2019",
    roles: [
      {
        title: "Senior Software Engineer",
        tag: "2015 to 2019",
        body: "First job out of college. Joined at 21, built internal tools, then helped build a telephony platform that ended up handling billions of calls. A patent fell out of that work, on shared virtual number allocation.",
      },
    ],
  },
];

const beyond = [
  { h: "Reading & writing", p: "I keep a running reading list, mostly fiction these days. I write a bit of Malayalam too, slowly." },
  { h: "Aquascaping", p: "Tending a planted aquarium at home. There's more biology and chemistry in a glass box of water than I expected, and somehow the algae always wins eventually." },
  { h: "Biochemistry", p: "I read papers and textbooks for fun, mostly molecular biology and metabolism. Adjacent to nothing I do at work, which is part of the appeal." },
  { h: "Travel", p: "Slow trains over fast flights. I write down what I notice. Sometimes it makes its way into a post." },
];

const elsewhere = [
  { label: "GitHub", hint: "@thebluefowl, for code", href: "https://github.com/thebluefowl", external: true },
  { label: "LinkedIn", hint: "The long-form CV", href: "https://www.linkedin.com/in/vishnujayadevan/", external: true },
  { label: "Email", hint: "If you want to say hi", href: "mailto:hi@vishnujayadevan.com", external: false },
];
</script>
