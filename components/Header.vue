<template>
  <header class="h-16 bg-white fixed top-0 w-full border-b border-gray-200 z-50">
    <div class="w-full h-full flex items-center justify-between px-4 md:px-8">
      <NuxtLink to="/" class="font-sans text-[12px] tracking-[0.2em] font-bold uppercase text-black hover:text-slate-500 transition-colors">
        Vishnu Jayadevan
      </NuxtLink>

      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2" aria-label="Toggle menu">
        <div class="w-6 h-5 flex flex-col justify-between">
          <span class="w-full h-0.5 bg-black transform transition-all duration-300" :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transform transition-all duration-300" :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
        </div>
      </button>

      <nav class="hidden md:flex font-sans text-[12px] tracking-[0.1em] uppercase items-center gap-7">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="['hover:text-slate-500 transition-colors', isActive(link.to) ? 'font-semibold' : '']" :aria-current="isActive(link.to) ? 'page' : undefined">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <div v-show="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200">
      <div class="flex flex-col py-4 px-4 space-y-4">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="['font-sans text-[12px] tracking-[0.1em] uppercase hover:text-slate-500', isActive(link.to) ? 'font-semibold' : '']" @click="isMenuOpen = false">
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);
const route = useRoute();

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/reading", label: "Reading" },
  { to: "/now", label: "Now" },
  { to: "/uses", label: "Uses" },
  { to: "/elsewhere", label: "Elsewhere" },
];

const isActive = (path) => route.path.startsWith(path);
</script>
