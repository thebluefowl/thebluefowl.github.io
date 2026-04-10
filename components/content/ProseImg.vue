<template>
    <figure class="my-4">
        <nuxt-img v-bind="$attrs" class="w-full"/>
        <figcaption class="border-b border-black text-right mt-2 text-sm">
            {{$attrs.alt}}
        </figcaption>
    </figure>
</template>

<script setup>
defineOptions({
    inheritAttrs: false,
});

</script>