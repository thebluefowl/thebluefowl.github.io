<template>
  <div>
    <div class="flex items-center font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-6">
      <span>Vishnu Jayadevan</span>
      <span class="flex-1 border-b border-solid border-gray-200 mx-4 h-px"></span>
      <span>{{ pageLabel }}</span>
    </div>
    <div v-if="subtitle" class="font-garamond italic text-[18px] text-gray-600 mb-7">
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ pageLabel: string; subtitle?: string }>();
</script>
