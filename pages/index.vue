<template>
    <NuxtLayout name="home">
        <div class="flex h-screen flex-col items-center justify-center w-full font-garamond">
            <div class="w-1/2">
                <h1 class="text-center sm:text-left text-2xl sm:text-4xl">
                    Personal website and blog of <div class="font-bold pl-1">Vishnu Jayadevan</div>
                </h1>
                <hr class="w-full my-16"/>
                <nav class="text-lg sm:text-2xl flex gap-8 link">
                    <nuxt-link to="/about" class="link">About</nuxt-link>
                    <nuxt-link to="/blog" class="link">Blog</nuxt-link>
                </nav>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'Home',
        description: 'Personal website and blog of Vishnu Jayadevan',
        documentDriven: {
            page: false,
            surround: false
        },
    })
</script>

