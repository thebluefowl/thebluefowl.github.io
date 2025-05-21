<template>
  <header
    class="h-16 bg-white fixed top-0 w-full min-w-96 border-b border-gray-200"
  >
    <div class="w-full h-full flex items-center justify-between px-8">
      <!-- Title -->
      <NuxtLink
        to="/"
        class="hover:text-slate-500 nav-link"
        exact-active-class="font-bold"
      >
        <span class="font-sans text-xs tracking-widest font-bold uppercase"
          >Vishnu Jayadevan</span
        >
      </NuxtLink>
      <!-- Links-->
      <div class="text-xs uppercase tracking-wider flex items-center gap-4">
        <NuxtLink
          to="/about"
          class="hover:text-[#64748b] nav-link"
          exact-active-class="font-bold"
          >About</NuxtLink
        >
        <NuxtLink
          to="/blog"
          class="hover:text-[#64748b] nav-link"
          exact-active-class="font-bold"
          >Blog</NuxtLink
        >
        <NuxtLink
          to="/book-shelf"
          class="hover:text-[#64748b] nav-link"
          exact-active-class="font-bold"
          >Book Shelf</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

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
  background-color: #64748b; /* slate-500 */
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
