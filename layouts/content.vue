<template>
  <div class="relative h-screen overflow-auto stable">
    <Header />
    <div
      class="h-full w-full p-4 sm:p-8 md:p-12 lg:p-16 flex justify-center font-garamond"
    >
      <div class="w-full sm:w-full sm:px-4 md:px-6 lg:px-8 xl:w-1/2 2xl:w-1/2">
        <slot name="header" />
        <div class="animate-fade-in">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.stable {
  scrollbar-gutter: stable;
}
</style>
