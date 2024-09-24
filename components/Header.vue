<template>
    <header class="h-16 bg-white fixed top-0 w-full min-w-96">  
        <div class="w-full h-full flex items-center justify-between px-8">
            <!-- Title -->
            <NuxtLink to="/" class="hover:text-slate-500" exact-active-class="font-bold">
                <span class="font-sans text-xs tracking-widest font-bold uppercase">Vishnu Jayadevan</span>
            </NuxtLink>
            <!-- Links-->
            <div class="text-xs uppercase tracking-wider flex items-center gap-4">
                <NuxtLink to="/about" class="hover:text-slate-500" exact-active-class="font-bold">About</NuxtLink>
                <NuxtLink to="/blog" class="hover:text-slate-500" exact-active-class="font-bold">Blog</NuxtLink>
            </div>
        </div>
    </header>
</template>