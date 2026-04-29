<template>
  <div class="mt-16 pt-6 border-t border-black flex items-baseline justify-between mb-6">
    <h2 class="font-garamond font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.02em] m-0">
      <slot>{{ title }}</slot>
    </h2>
    <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-gray-500">§ {{ num }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string; num: string }>();
</script>
