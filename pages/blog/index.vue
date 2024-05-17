<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

    // const query: QueryBuilderParams = { path: '/blog', sort: [{ date: -1 }] }
</script>



<template>
    <NuxtLayout>
        <PageTitle>
            Writing
            {{ data }}
        </PageTitle>
        <ContentList :query=query v-slot="{ list }">
            <div v-for="article in list" :key="article._path">
                <nuxt-link :to="article._path" class="grid grid-cols-[auto,1fr,auto] items-center gap-x-2">
                    <span>{{ article.title }}</span>
                    <hr class="border-black border-dashed">
                    <span>{{article.date}}</span>
                </nuxt-link>
            </div>
        </ContentList>        
    </NuxtLayout>
</template>

