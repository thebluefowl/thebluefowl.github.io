<template>
  <header class="h-16 bg-white fixed top-0 w-full border-b border-gray-200 z-50">
    <div class="w-full h-full flex items-center justify-between px-4 md:px-8">
      <!-- Title -->
      <NuxtLink to="/" class="hover:text-slate-500 nav-link" :class="{ 'font-bold': isActive('/') }">
        <span class="font-sans text-xs tracking-widest font-bold uppercase">Vishnu Jayadevan</span>
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2" aria-label="Toggle menu">
        <div class="w-6 h-5 flex flex-col justify-between">
          <span class="w-full h-0.5 bg-black transform transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-black transform transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
        </div>
      </button>

      <!-- Desktop Links -->
      <div class="hidden md:flex text-xs uppercase tracking-wider items-center gap-4">
        <NuxtLink to="/about" class="hover:text-[#64748b] nav-link" :class="{ 'font-bold': isActive('/about') }">About
        </NuxtLink>
        <NuxtLink to="/blog" class="hover:text-[#64748b] nav-link" :class="{ 'font-bold': isActive('/blog') }">Blog
        </NuxtLink>
        <NuxtLink to="/book-shelf" class="hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/book-shelf') }">Book Shelf</NuxtLink>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200">
      <div class="flex flex-col py-4 px-4 space-y-4">
        <NuxtLink to="/about" class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/about') }" @click="isMenuOpen = false">About</NuxtLink>
        <NuxtLink to="/blog" class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/blog') }" @click="isMenuOpen = false">Blog</NuxtLink>
        <NuxtLink to="/book-shelf" class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/book-shelf') }" @click="isMenuOpen = false">Book Shelf</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false)
const route = useRoute()

const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>

<style scoped>
.nav-link {
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #64748b;
  /* slate-500 */
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
