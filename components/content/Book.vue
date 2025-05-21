<template>
  <div class="flex items-center gap-2 w-full">
    <div>{{ title }}</div>
    <div class="flex-grow border-b border-dotted border-gray-300 mx-2"></div>
    <div>{{ author }}</div>
    <div class="flex items-center gap-1 w-[120px]">
      <template v-if="status === 'in-progress'">
        <Icon name="ph:book-open" color="blue" />
        <span class="text-sm text-gray-500 whitespace-nowrap">In Progress</span>
      </template>
      <template v-else-if="status === 'shelf'">
        <Icon name="ph:books" color="gray" />
        <span class="text-sm text-gray-500 whitespace-nowrap">On Shelf</span>
      </template>
      <template v-else>
        <div class="flex gap-1">
          <template v-for="i in 5" :key="i">
            <Icon
              v-if="i <= Math.floor(stars)"
              name="ph:star-fill"
              color="yellow"
            />
            <Icon
              v-else-if="i - 0.5 <= stars && stars % 1 !== 0"
              name="ph:star-half-fill"
              color="yellow"
            />
            <Icon v-else name="ph:star" color="yellow" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Book Shelf | Vishnu Jayadevan's Reading List",
  description:
    "Discover my book recommendations and reading journey. Explore contemporary novels, literary fiction, and classic works with personal reviews and ratings. Updated reading list featuring completed books, current reads, and future picks.",
  documentDriven: {
    page: false,
    surround: false,
  },
});
const props = defineProps<{
  title: string;
  author: string;
  stars: number;
  status?: "completed" | "in-progress" | "shelf";
}>();
</script>
