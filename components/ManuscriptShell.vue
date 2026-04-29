<template>
  <div class="min-h-screen flex flex-col font-garamond bg-white text-black">
    <Header />
    <main class="flex-grow w-full pt-16 px-6 sm:px-10 md:px-16 lg:px-20 flex justify-center">
      <article class="w-full max-w-[920px] py-14 md:py-20 flex flex-col">
        <slot />
      </article>
    </main>
    <Footer />
  </div>
</template>
