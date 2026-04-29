<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="About" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <AboutLanguageSwitcher />
      <div class="pb-48">
        <div class="mb-8">
          <div class="text-xl font-light font-garamond leading-relaxed">
            I'm <span class="font-bold">Vishnu Jayadevan</span>, a software
            engineer based in Bangalore, India. I work at
            <a link href="https://deepsource.com" class="font-bold"
              >DeepSource</a
            >, where I build code quality and security tools. I write here
            about distributed systems, software architecture, and occasionally
            about other things I find interesting: biochemistry, aquascaping,
            travel. Some posts are in Malayalam, for folks back home.
          </div>
        </div>
        <h2 class="text-4xl mb-4">Career</h2>
        <div class="mb-8 pl-8 grid lg:grid-cols-2 gap-y-4">
          <div class="flex items-center">
            <div>
              <h3 class="">DeepSource</h3>
              <div>(2020-Present)</div>
            </div>
            <span class="flex-grow hidden lg:block">
              <svg
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-2"
              >
                <path
                  d="M0,5 C10,0 20,10 30,5 C40,0 50,10 60,5 C70,0 80,10 90,5"
                  stroke="black"
                  fill="transparent"
                />
              </svg>
            </span>
          </div>
          <div>
            <h4 class="text-lg font-semibold">Staff Engineer</h4>
            <p>
              Went back to IC. Turns out I have more impact with a keyboard
              than a calendar. Working on product and platform engineering
              problems across the stack.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">Engineering Manager</h4>
            <p>
              Built and led the product, platform and security engineering
              teams. Spent most of my time hiring, setting technical direction,
              and trying to stay out of the way.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">Technical Lead</h4>
            <p>
              The zero-to-one phase. Rewrote the frontend, built reporting,
              the public API, the CLI, and set up on-premise deployments for
              enterprise customers.
            </p>
          </div>
          <hr />
          <hr class="hidden lg:block" />
          <div class="flex items-center">
            <div>
              <h3 class="">Exotel</h3>
              <div>(2015-2019)</div>
            </div>
            <span class="flex-grow hidden lg:block">
              <svg
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-2"
              >
                <path
                  d="M0,5 C10,0 20,10 30,5 C40,0 50,10 60,5 C70,0 80,10 90,5"
                  stroke="black"
                  fill="transparent"
                />
              </svg>
            </span>
          </div>
          <div>
            <h4 class="text-lg font-semibold">Senior Software Engineer</h4>
            <p>
              First job out of college. Joined at 21, built internal tools,
              then helped build a telephony platform that ended up handling
              billions of calls. Got a patent out of it.
            </p>
          </div>
        </div>

        <h2 class="text-4xl mb-4 mt-12">Beyond work</h2>
        <div class="mb-8 pl-8 grid lg:grid-cols-2 gap-y-6 gap-x-8 font-garamond">
          <div>
            <h3 class="text-lg font-semibold">Reading &amp; writing</h3>
            <p>
              I keep a running <NuxtLink to="/reading" class="underline hover:text-gray-700">reading list</NuxtLink>,
              mostly fiction these days. I write a bit of Malayalam too, slowly.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Aquascaping</h3>
            <p>
              Tending a planted aquarium at home. There is more biology and chemistry in a glass box of
              water than I expected, and somehow the algae always wins eventually.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Biochemistry, casually</h3>
            <p>
              I read papers and textbooks for fun, mostly molecular biology and metabolism.
              Adjacent to nothing I do at work, which is part of the appeal.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Travel</h3>
            <p>
              Slow trains over fast flights. I write down what I notice. Sometimes it makes
              its way <NuxtLink to="/blog" class="underline hover:text-gray-700">here</NuxtLink>.
            </p>
          </div>
        </div>

        <h2 class="text-4xl mb-4 mt-12">Patents &amp; recognition</h2>
        <div class="mb-8 pl-8 font-garamond">
          <ul class="list-disc space-y-2">
            <li>
              <span class="font-semibold">Telephony routing system</span>
              <span class="text-gray-600">. Filed during my time at Exotel, around the call platform we built.</span>
            </li>
          </ul>
        </div>

        <h2 class="text-4xl mb-4 mt-12">Elsewhere</h2>
        <div class="mb-8 pl-8 font-garamond">
          <ul class="space-y-2 text-base">
            <li>
              <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" class="underline hover:text-gray-700">GitHub</a>
              for code.
            </li>
            <li>
              <a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener" class="underline hover:text-gray-700">LinkedIn</a>
              for the long form CV.
            </li>
            <li>
              <a href="mailto:hi@vishnujayadevan.com" class="underline hover:text-gray-700">Email</a>
              if you want to say hi.
            </li>
          </ul>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  documentDriven: {
    page: false,
    surround: false,
  },
});

useSeoMeta({
  title: "About | Vishnu Jayadevan",
  description:
    "Software engineer and technology leader with experience in distributed systems and software architecture. Currently leading engineering at DeepSource, previously at Exotel.",
  ogTitle: "About | Vishnu Jayadevan",
  ogDescription:
    "Software engineer and technology leader. Currently leading engineering at DeepSource, previously at Exotel.",
});

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "Home", to: "/" }];
});
</script>
