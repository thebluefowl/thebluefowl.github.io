<template>
  <footer class="border-t border-gray-200 mt-24 py-10 font-garamond text-sm text-gray-600">
    <div class="w-full px-4 sm:px-8 md:px-12 lg:px-16 flex justify-center">
      <div class="w-full sm:w-full sm:px-4 md:px-6 lg:px-8 xl:w-1/2 2xl:w-1/2">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div class="font-sans text-xs tracking-widest uppercase text-gray-700">
              Vishnu Jayadevan
            </div>
            <div class="mt-1">Bangalore, India</div>
          </div>

          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider font-sans">
            <NuxtLink to="/now" class="hover:text-slate-700">Now</NuxtLink>
            <NuxtLink to="/projects" class="hover:text-slate-700">Projects</NuxtLink>
            <NuxtLink to="/uses" class="hover:text-slate-700">Uses</NuxtLink>
            <NuxtLink to="/elsewhere" class="hover:text-slate-700">Elsewhere</NuxtLink>
            <a href="/rss.xml" class="hover:text-slate-700 inline-flex items-center gap-1">
              <Icon name="mdi:rss" class="w-3.5 h-3.5" /> RSS
            </a>
          </div>

          <div class="flex items-center gap-4">
            <a href="https://github.com/thebluefowl" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-slate-700">
              <Icon name="mdi:github" class="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:text-slate-700">
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
            <a href="mailto:hi@vishnujayadevan.com" aria-label="Email" class="hover:text-slate-700">
              <Icon name="mdi:email-outline" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div class="mt-8 flex flex-col md:flex-row md:justify-between gap-2 text-xs text-gray-500">
          <div>&copy; {{ year }} Vishnu Jayadevan</div>
          <div>Built with Nuxt &middot; Set in EB Garamond</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
