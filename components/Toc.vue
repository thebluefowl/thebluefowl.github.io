<template>
  <div
    v-for="(postsInCategory, category) in categorizedPosts"
    :key="category"
    class="mb-8"
  >
    <h2 v-if="showCategory" class="text-left font-serif text-lg mb-2">
      <nuxt-link
        :to="`/blog/category/${category}`"
        class="hover:text-slate-700"
      >
        {{ category }}
      </nuxt-link>
    </h2>
    <ul class="pl-4">
      <li
        v-for="post in postsInCategory"
        :key="post.slug"
        class="flex justify-between items-center"
      >
        <nuxt-link :to="post._path" class="hover:text-slate-700 flex-grow">
          <div class="flex justify-between items-center">
            <span
              class="max-w-32 xl:max-w-64 text-ellipsis truncate font-serif text-sm"
            >
              {{ post.title }}
            </span>
            <span
              class="flex-grow border-b border-dotted border-gray-300 mx-4"
            ></span>
            <span class="font-serif text-sm text-gray-600">
              {{ usePrettyDate(post.date) }}
            </span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const props = defineProps<{
  filter?: string;
  showCategory?: boolean;
}>();

// Fetch content data with filtering
const query = queryContent("/blog");
if (props.filter) {
  query.where({
    category: {
      $icontains: props.filter,
    },
  });
}

const { data: fetchedData } = useAsyncData("home", () => query.find());

// Categorize posts using computed property
const categorizedPosts = computed(() => {
  const posts: Record<string, ParsedContent[]> = {};
  fetchedData.value?.forEach((post: ParsedContent) => {
    const category = post.category || "uncategorized";
    if (!posts[category]) {
      posts[category] = [];
    }
    posts[category].push(post);
  });

  return posts;
});
</script>
