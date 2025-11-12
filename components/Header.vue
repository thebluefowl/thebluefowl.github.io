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

        <!-- Lists Dropdown -->
        <div class="relative" @mouseenter="isListsDropdownOpen = true" @mouseleave="isListsDropdownOpen = false">
          <button class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link flex items-center gap-1"
            :class="{ 'font-bold': isActive('/reading') }">
            Lists
            <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isListsDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1">
            <div v-show="isListsDropdownOpen" class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[120px] z-[60]">
              <NuxtLink to="/reading" class="block px-4 py-2 text-xs uppercase tracking-wider hover:bg-gray-50 hover:text-[#64748b]"
                :class="{ 'font-bold': isActive('/reading') }">Reading</NuxtLink>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200">
      <div class="flex flex-col py-4 px-4 space-y-4">
        <NuxtLink to="/about" class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/about') }" @click="isMenuOpen = false">About</NuxtLink>
        <NuxtLink to="/blog" class="text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
          :class="{ 'font-bold': isActive('/blog') }" @click="isMenuOpen = false">Blog</NuxtLink>

        <!-- Lists with submenu -->
        <div>
          <button @click="toggleListsDropdown" class="text-xs uppercase tracking-wider hover:text-[#64748b] flex items-center gap-1 w-full text-left"
            :class="{ 'font-bold': isActive('/reading') }">
            Lists
            <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isListsDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1">
            <div v-show="isListsDropdownOpen" class="pl-4 mt-2 space-y-2">
              <NuxtLink to="/reading" class="block text-xs uppercase tracking-wider hover:text-[#64748b] nav-link"
                :class="{ 'font-bold': isActive('/reading') }" @click="isMenuOpen = false">Reading</NuxtLink>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false)
const isListsDropdownOpen = ref(false)
const route = useRoute()

const isActive = (path) => {
  return route.path.startsWith(path)
}

const toggleListsDropdown = () => {
  isListsDropdownOpen.value = !isListsDropdownOpen.value
}

const closeListsDropdown = () => {
  isListsDropdownOpen.value = false
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
