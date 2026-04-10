<template>
  <!-- Desktop View -->
  <div
    class="hidden md:flex items-center gap-2 2xl:gap-8 w-full overflow-hidden py-2"
  >
    <div class="min-w-[100px] max-w-[35%] truncate" :title="title">
      {{ title }}
    </div>
    <div class="flex-grow border-b border-dotted border-gray-300 mx-1"></div>
    <div class="min-w-[100px] max-w-[25%] text-right truncate" :title="author">
      {{ author }}
    </div>
    <div class="flex items-center gap-1 w-[100px] shrink-0">
      <template v-if="status === 'in-progress'">
        <Icon name="mdi:book-open-page-variant-outline" color="blue" />
        <span class="text-sm text-gray-500 whitespace-nowrap">In Progress</span>
      </template>
      <template v-else-if="status === 'dnf'">
        <Icon name="mdi:book-remove" color="gray" />
        <span class="text-sm text-gray-500 whitespace-nowrap">Did Not Finish</span>
      </template>
      <template v-else-if="status === 'shelf'">
        <Icon name="mdi:bookshelf" color="gray" />
        <span class="text-sm text-gray-500 whitespace-nowrap">On Shelf</span>
      </template>
      <template v-else-if="stars">
        <div class="flex gap-0.5">
          <template v-for="i in 5" :key="i">
            <Icon
              v-if="i <= Math.floor(Number(stars))"
              name="mdi:star"
              color="yellow"
            />
            <Icon
              v-else-if="i - 0.5 <= Number(stars) && Number(stars) % 1 !== 0"
              name="mdi:star-half-full"
              color="yellow"
            />
            <Icon v-else name="mdi:star-outline" color="yellow" />
          </template>
        </div>
      </template>
    </div>
  </div>

  <!-- Mobile View -->
  <div class="md:hidden">
    <button
      @click="toggleDetails"
      class="w-full text-left p-3 -mx-3 active:bg-gray-50 rounded-lg touch-manipulation"
    >
      <div class="flex items-center gap-2">
        <div class="flex-grow">
          <div class="font-medium text-gray-900">{{ title }}</div>
          <div class="text-sm text-gray-500">{{ author }}</div>
        </div>
        <Icon
          name="mdi:chevron-right"
          class="text-gray-400 w-5 h-5"
          :class="{ 'rotate-90': isDetailsOpen }"
        />
      </div>
    </button>
  </div>

  <!-- Mobile Details Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isDetailsOpen"
        class="fixed inset-0 z-50 bg-black/20"
        @click="closeDetails"
      >
        <div
          class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-medium text-gray-900">{{ title }}</h3>
              <p class="text-gray-500">{{ author }}</p>
            </div>
            <button
              @click="closeDetails"
              class="p-2 -m-2 active:bg-gray-100 rounded-full"
            >
              <Icon name="mdi:close" class="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <template v-if="status === 'in-progress'">
                <Icon
                  name="mdi:book-open-page-variant-outline"
                  color="blue"
                  class="w-6 h-6"
                />
                <span class="text-base text-gray-700">Currently Reading</span>
              </template>
              <template v-else-if="status === 'dnf'">
                <Icon name="mdi:book-remove" color="gray" class="w-6 h-6" />
                <span class="text-base text-gray-700">Did Not Finish</span>
              </template>
              <template v-else-if="status === 'shelf'">
                <Icon name="mdi:bookshelf" color="gray" class="w-6 h-6" />
                <span class="text-base text-gray-700">On My Shelf</span>
              </template>
              <template v-else-if="stars">
                <div class="flex items-center gap-3">
                  <div class="flex gap-1">
                    <template v-for="i in 5" :key="i">
                      <Icon
                        v-if="i <= Math.floor(Number(stars))"
                        name="mdi:star"
                        color="yellow"
                        class="w-6 h-6"
                      />
                      <Icon
                        v-else-if="
                          i - 0.5 <= Number(stars) && Number(stars) % 1 !== 0
                        "
                        name="mdi:star-half-full"
                        color="yellow"
                        class="w-6 h-6"
                      />
                      <Icon
                        v-else
                        name="mdi:star-outline"
                        color="yellow"
                        class="w-6 h-6"
                      />
                    </template>
                  </div>
                  <span class="text-base text-gray-700">{{ stars }} / 5</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  author: string;
  stars?: string;
  status?: "completed" | "in-progress" | "shelf" | "dnf";
}>();

const isDetailsOpen = ref(false);

const toggleDetails = () => {
  isDetailsOpen.value = !isDetailsOpen.value;
};

const closeDetails = () => {
  isDetailsOpen.value = false;
};

// Close details when pressing Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isDetailsOpen.value) {
      closeDetails();
    }
  };

  window.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
  });
});
</script>
