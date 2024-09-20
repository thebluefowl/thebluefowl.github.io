<template>
    <NuxtLayout>
        <template #body>
            <div class="flex flex-col items-center gap-4 text-3xl justify-center h-screen font-garamond top-0 ">
                <a href="https://github.com/thebluefowl" target="_blank" rel="noopener noreferrer" class=" font-light hover:text-slate-500">GitHub</a>
                <a href="https://www.linkedin.com/in/vishnujayadevan/" target="_blank" rel="noopener noreferrer" class="font-light hover:text-slate-500">LinkedIn</a>
                <a href="https://twitter.com/thebluefowl" target="_blank" rel="noopener noreferrer" class="font-light hover:text-slate-500">Twitter</a>
            </div>
        </template>
    </NuxtLayout>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'Connect',
        description: 'Connect with Vishnu Jayadevan on GitHub, LinkedIn, and Twitter',
        documentDriven: {
            page: false,
            surround: false
        },
    })
</script>