<template>
  <NuxtLayout name="content">
    <template #header>
      <PageTitle title="About" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <AboutLanguageSwitcher />
      <div class="pb-8">
        <div class="mb-8">
          <div class="text-xl font-light font-garamond leading-relaxed">
            I am <span class="font-bold">Vishnu Jayadevan</span>, a software
            engineer based in Bangalore, India. I am currently at
            <a link href="https://deepsource.com" class="font-bold"
              >DeepSource</a
            >, building tools to help developers write better code. This is my
            little corner of the internet where I write about distributed
            systems, software architecture and leadership in tech. You'll
            occasionally find posts in other topics like biochemistry,
            aquascaping and travel. You might also find some posts in Malayalam
            for the folks back home.
          </div>
        </div>
        <h2 class="text-4xl mb-4">Career</h2>

        <div class="mb-8 pl-8 grid lg:grid-cols-2 gap-y-4">
          <div class="flex items-center">
            <div>
              <h3 class="">DeepSource</h3>
              <div>(2024-Present)</div>
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
            <h4 class="text-lg font-semibold">
              Senior Software Engineer - Product Engineering
            </h4>
            <p>Building the core API platform and developer tools at Exotel.</p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">
              Software Development Engineer | Enterprise Technology
            </h4>
            <p>
              Building state-of-the-art cloud telephony solutions for large
              enterprises and launched a new product line.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">
              Software Development Engineer | Product Engineering
            </h4>
            <p>Building internal developer experience tools.</p>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  title: "About | Vishnu Jayadevan",
  description:
    "Software engineer and technology leader with experience in distributed systems and software architecture. Currently leading engineering at DeepSource, previously at Exotel. Writing about tech, travel, and personal experiences.",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "~", to: "/" }];
});
</script>
