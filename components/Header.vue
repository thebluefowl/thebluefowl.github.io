<template>
    <header class="h-16 bg-white fixed bottom-0 w-full mx-auto">  
        <div class="w-full h-full border-t border-black flex items-center justify-between mx-auto max-w-screen-lg">
            <!-- Title -->
            <div>
                <span class="uppercase font-sans text-md font-bold">Vishnu Jayadevan</span>
            </div>
            <!-- Links-->
            <div class="uppercase text-sm font-semibold">
                <NuxtLink to="/" class="mr-4">Home</NuxtLink>
                <NuxtLink to="/blog" class="mr-4">Blog</NuxtLink>
                <NuxtLink to="/contact" class="mr-4">Contact</NuxtLink>
            </div>
        </div>
    </header>
</template>