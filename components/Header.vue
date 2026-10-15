<template>
  <header class="h-16 bg-paper fixed top-0 w-full border-b border-black z-50" @keydown.esc="closeMenu">
    <div class="h-full px-6 sm:px-10 md:px-16 lg:px-20">
    <div class="max-w-[1120px] h-full mx-auto flex items-center justify-between">
      <NuxtLink to="/" class="font-mono text-[12px] tracking-[0.16em] font-medium uppercase text-black hover:text-slate-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
        Vishnu Jayadevan
      </NuxtLink>

      <button ref="menuButton" @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"aria-label="Toggle menu" :aria-expanded="isMenuOpen" aria-controls="mobile-menu">
        <div class="w-6 h-5 flex flex-col justify-between">
          <span class="w-full h-0.5 bg-black transform transition-all duration-300" :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transform transition-all duration-300" :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
        </div>
      </button>

      <nav class="hidden md:flex font-mono text-[12px] tracking-[0.08em] uppercase items-center gap-7">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="['hover:text-slate-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',isActive(link.to) ? 'font-semibold' : '']" :aria-current="isActive(link.to) ? 'page' : undefined">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
    </div>

    <div id="mobile-menu" v-show="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-paper border-b border-black">
      <div class="flex flex-col py-2 px-6 sm:px-10">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="['block py-3 font-mono text-[13px] tracking-[0.08em] uppercase hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',isActive(link.to) ? 'font-semibold' : '']" @click="isMenuOpen = false">
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);
const menuButton = ref(null);
const route = useRoute();

const closeMenu = () => {
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
  menuButton.value?.focus();
};

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
