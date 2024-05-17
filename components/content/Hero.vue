<template>
    <div class="w-full mx-auto">
        <img :src="src" class="w-full h-full object-cover" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    src: {
        type: String,
        required: true,
    },
})
</script>
