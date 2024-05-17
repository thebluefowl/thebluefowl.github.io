<template>
    <PageTitle>
        {{ content.title }}
    </PageTitle>
    <div>
        <div class="flex items-center text-gray-600 w-full border-t border-black text-md">
            <div class="mr-4 uppercase font-semibold">{{ content.category }}</div> | 
            <span class="px-4 font-sans">{{ content.date }}</span>
        </div>
    </div>
    <div class="markdown">              
        <ContentRenderer :value="content" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    content: {
        type: Object,
        required: true,
    },
})
</script>