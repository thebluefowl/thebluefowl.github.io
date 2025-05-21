<template>
  <div class="relative h-screen overflow-auto stable">
    <Header />
    <div class="h-full w-full p-16 flex justify-center font-garamond">
      <div class="w-full sm:w-full sm:px-8 xl:w-1/2 2xl:w-1/2">
        <slot name="header" />
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.stable {
  scrollbar-gutter: stable;
}
</style>
