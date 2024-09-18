<template>
    <NuxtLayout name="home">
        
        <div class="flex items-center justify-center h-screen p-24 gap-x-20">
            <h1 class="text-right w-1/2">
                <div class="uppercase text-xs font-bold tracking-widest">
                    Vishnu Jayadevan
                </div>
                <div class="text-xs block my-8">
                    Software Engineer | Gopher | Tinkerer
                    <p>
                        Staff Engineer @ <a href="https://deepsource.com" class="underline">DeepSource</a>
                    </p>
                </div>
            </h1>
            <div class="w-1/2 text-9xl font-garamond flex flex-col space-y-4">
                <nuxt-link to="/about">About</nuxt-link>
                <nuxt-link to="/blog">Blog</nuxt-link>
                <nuxt-link to="/connect">Connect</nuxt-link>
            </div>
            
        </div>
    </NuxtLayout>
</template>