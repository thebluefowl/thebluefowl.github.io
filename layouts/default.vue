<template>
  <div class="relative h-screen overflow-auto stable">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.stable {
  scrollbar-gutter: stable;
}
</style>
