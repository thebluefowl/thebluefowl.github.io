<template>
    <div>
        <div class="wrap mt-4">
            <NuxtImg :src="url" :alt="alt" :title="title"/>
            <div class="border-b border-black text-right mt-2 text-sm">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        url: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default:"",
            required: false,
        },
        title: {
            type: String,
            default: "",
            required: false
        }
    })
</script>