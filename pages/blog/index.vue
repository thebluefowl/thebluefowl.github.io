<template>
    <NuxtLayout>
        <template #header>
            <PageTitle title="Blog" :breadcrumbs="breadcrumbs()"/>
        </template> 
        <template #body>
        <Toc :show-category="true"/>
    </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from '~/components/PageTitle.vue';

const breadcrumbs = (): BreadCrumb[] => {
    const breadcrumbs: BreadCrumb[] = [
    { label: '~', to: '/' },
    ];
    return breadcrumbs;
};
</script>
