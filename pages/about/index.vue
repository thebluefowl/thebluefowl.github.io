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
            >, where I work on the latest generation of code quality and
            security tools. This site is my little corner of the internet, where
            I share thoughts on distributed systems, software architecture, and
            leadership in tech. From time to time, I also write about other
            interests—like biochemistry, aquascaping, and travel. You might even
            come across the occasional post in Malayalam, for folks back home.
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
              Returned to a Staff Engineer role to help shape the next
              generation of products at DeepSource. I currently wear multiple
              hats—driving development across our Software Composition Analysis
              (SCA) and AI initiatives, while also tackling core performance and
              scalability challenges within the platform.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">Engineering Manager</h4>
            <p>
              Built and led the product, platform and security engineering teams
              at DeepSource. I was primarily involved in building up a rockstar
              team of engineers, while contributing to the overall technical
              strategy and architecture.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">Technical Lead</h4>
            <p>
              Led the development of DeepSource's core product and platform
              through its formative zero-to-one phase. This included a full
              rewrite of the frontend UI to improve usability and performance,
              building foundational features like reporting, a public API, and
              the DeepSource CLI, and setting up support for on-premise
              deployments to serve enterprise customers.
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
              This was my first job after college. At 21, I joined a small team
              of engineers and had the privilege of working with some of the
              best minds in the industry. I wore many hats, ranging from
              building internal tools to developing a new telephony platform for
              the enterprise market that powered billions of phone
              conversations. This work resulted in my first granted patent for
              innovations in telephony infrastructure.
            </p>
          </div>
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
