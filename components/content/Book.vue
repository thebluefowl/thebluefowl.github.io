<template>
  <li class="flex items-baseline py-3">
    <span class="font-garamond text-[18px] md:text-[20px] font-normal text-black shrink-0 leading-none max-w-[60%] truncate">{{ title }}</span>
    <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
    <span class="font-garamond italic text-[15px] md:text-[16px] text-gray-600 shrink-0">
      {{ author }}<template v-if="trailText">, </template>
      <template v-if="stars">
        <span class="not-italic tracking-[0.05em] text-black font-garamond">{{ starGlyphs }}</span>
      </template>
      <template v-else-if="trailText">
        <span :class="trailItalic ? 'italic' : 'not-italic'">{{ trailText }}</span>
      </template>
    </span>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  author: string;
  stars?: string;
  status?: "completed" | "in-progress" | "shelf" | "dnf";
}>();

const trailText = computed(() => {
  if (props.status === "in-progress") return "now reading";
  if (props.status === "shelf") return "on the shelf";
  if (props.status === "dnf") return "did not finish";
  return "";
});

const trailItalic = computed(() => props.status === "in-progress" || props.status === "dnf");

const starGlyphs = computed(() => {
  const n = Number(props.stars);
  if (!n) return "";
  const full = Math.floor(n);
  const half = n % 1 !== 0;
  let s = "";
  for (let i = 0; i < full; i++) s += "★";
  if (half) s += "⯨";
  for (let i = full + (half ? 1 : 0); i < 5; i++) s += "☆";
  return s;
});
</script>
