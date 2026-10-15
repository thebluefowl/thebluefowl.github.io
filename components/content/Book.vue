<template>
  <li class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-[#ddd8cf]">
    <div class="min-w-0">
      <em class="font-garamond text-[22px] leading-[1.2]">{{ title }}</em>
      <span class="font-garamond text-[18px] text-gray-600 ml-3.5">{{ author }}</span>
    </div>
    <span v-if="trail" class="font-mono text-[12px] text-gray-600">{{ trail }}</span>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  author: string;
  stars?: string;
  status?: "completed" | "in-progress" | "shelf" | "dnf";
}>();

const trail = computed(() => {
  if (props.status === "in-progress") return "in progress";
  if (props.status === "shelf") return "on the shelf";
  if (props.status === "dnf") return "did not finish";
  const n = Number(props.stars);
  return Number.isFinite(n) && n > 0 ? "★".repeat(Math.floor(n)) + (n % 1 ? "½" : "") : "";
});
</script>
