<template>
  <div class="my-4">
    <nuxt-img v-bind="$attrs" class="w-full" />
    <div class="border-b border-black text-right mt-2 text-sm">
      {{ $attrs.alt }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
