<template>
  <li class="flex items-baseline py-3">
    <span class="font-garamond text-[18px] md:text-[20px] font-normal text-black shrink-0 leading-none max-w-[60%] truncate">{{ title }}</span>
    <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
    <span class="font-garamond italic text-[15px] md:text-[16px] text-gray-600 shrink-0 inline-flex items-center gap-3">
      <span>{{ author }}</span>
      <template v-if="starsNum">
        <span class="inline-flex items-center gap-0.5 text-black not-italic">
          <Icon
            v-for="(kind, i) in starIcons"
            :key="i"
            :name="kind"
            class="w-[14px] h-[14px]"
          />
        </span>
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

const starsNum = computed(() => {
  const n = Number(props.stars);
  return Number.isFinite(n) && n > 0 ? n : 0;
});

const starIcons = computed(() => {
  const n = starsNum.value;
  if (!n) return [];
  const full = Math.floor(n);
  const half = n % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);
  return [
    ...Array(full).fill("mdi:star"),
    ...(half ? ["mdi:star-half-full"] : []),
    ...Array(empty).fill("mdi:star-outline"),
  ];
});
</script>
