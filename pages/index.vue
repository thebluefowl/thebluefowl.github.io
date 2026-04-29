<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow w-full pt-16 px-6 sm:px-10 md:px-16 lg:px-20 flex justify-center">
      <div class="monolith w-full max-w-[1280px] flex flex-col justify-center min-h-[calc(100vh-12rem)] py-10 md:py-14">
        <h1
          class="wordmark border-y border-black flex items-center justify-center overflow-hidden py-6"
          aria-label="Vishnu Jayadevan"
        >
          <span class="wordmark__name">Vishnu&nbsp;Jayadevan</span>
        </h1>

        <div class="strip mt-4 flex items-center w-full font-sans text-[12px] uppercase tracking-[0.18em] text-gray-500">
          <span>Software engineer</span>
          <span class="bar"></span>
          <span>Bangalore, IN</span>
          <span class="bar"></span>
          <span>{{ year }} ed.</span>
          <span class="bar"></span>
          <span>vishnujayadevan.com</span>
        </div>

        <div class="grid mt-12 pt-12 grid-cols-1 xl:grid-cols-[1fr_1.4fr_1fr] gap-10 xl:gap-14">
          <section class="col">
            <div class="eyebrow">Currently</div>
            <ul class="mono-list">
              <li>
                <span class="key">Working on</span>
                <i class="leader"></i>
                <b><a href="https://deepsource.com" class="hover-slate">DeepSource</a></b>
              </li>
              <li>
                <span class="key">Reading</span>
                <i class="leader"></i>
                <b><em>Eurotrash</em></b>
              </li>
              <li>
                <span class="key">Writing</span>
                <i class="leader"></i>
                <b>Distributed systems</b>
              </li>
              <li>
                <span class="key">Living in</span>
                <i class="leader"></i>
                <b>Bangalore</b>
              </li>
            </ul>
          </section>

          <section class="col">
            <div class="eyebrow">Latest writing</div>
            <NuxtLink v-if="latestPost" :to="latestPost._path" class="post-link block">
              <span class="post-title">{{ latestPost.title }}</span>
              <span class="post-meta">
                {{ usePrettyDate(latestPost.date) }} &middot; {{ latestPost.category }}
              </span>
            </NuxtLink>
            <NuxtLink to="/blog" class="arrow">All writing &rarr;</NuxtLink>
          </section>

          <section class="col">
            <div class="eyebrow">Elsewhere</div>
            <ul class="elsewhere">
              <li><a href="https://github.com/thebluefowl" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="mailto:hi@vishnujayadevan.com">Email</a></li>
              <li><a href="/rss.xml">RSS</a></li>
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

<style scoped>
.monolith {
  font-family: "EB Garamond", Georgia, serif;
}

.wordmark {
  margin: 0;
}
.wordmark__name {
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 600;
  font-size: clamp(48px, 9.5vw, 132px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
}

.strip .bar {
  flex: 1;
  border-bottom: 1px dotted #d1d5db;
  margin: 0 16px;
  height: 1px;
}

.eyebrow {
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 14px;
}

.mono-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mono-list li {
  display: flex;
  align-items: baseline;
}
.mono-list .key {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #6b7280;
  flex-shrink: 0;
}
.mono-list .leader {
  flex: 1;
  border-bottom: 1px dotted #d1d5db;
  margin: 0 12px;
  align-self: center;
  height: 1px;
  display: inline-block;
}
.mono-list b {
  font-family: "EB Garamond", serif;
  font-weight: 500;
  font-size: 17px;
  color: #000;
  flex-shrink: 0;
}
.mono-list b a { color: inherit; text-decoration: none; }
.mono-list b a:hover { color: #64748b; }

.post-link {
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.post-link:hover .post-title { color: #64748b; }
.post-title {
  font-family: "EB Garamond", serif;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 500;
  transition: color 0.15s ease-out;
}
.post-meta {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #6b7280;
}

.arrow {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
  display: inline-block;
  width: max-content;
  transition: color 0.15s ease-out, border-color 0.15s ease-out;
}
.arrow:hover { color: #64748b; border-color: #64748b; }

.elsewhere {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.elsewhere a {
  font-family: "EB Garamond", serif;
  font-size: 22px;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease-out;
  width: max-content;
}
.elsewhere a:hover { border-bottom-color: #000; }

.hover-slate { transition: color 0.15s ease-out; }
.hover-slate:hover { color: #64748b; }
</style>
