<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow w-full pt-16 px-4 sm:px-8 md:px-12 lg:px-16 flex justify-center font-garamond">
      <div class="w-full sm:w-full sm:px-4 md:px-6 lg:px-8 xl:w-1/2 2xl:w-1/2 pb-12">
        <slot name="header" />
        <div class="animate-fade-in">
          <slot name="body" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
