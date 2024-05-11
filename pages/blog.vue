<template>
    <div>image</div>
    <div class="flex items-center justify-center w-full">
        <div class="w-1/2">
            <h1 class="text-8xl text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </h1>
            <div class="text-center">
                <div>
                    <div class="text-md p-8">Travel</div>
                    <span class="text-xl p-8 font-sans">23.9.2022</span>
                </div>
                
            </div>
            <p class="text-2xl font-serif p-8">
                <ContentDoc v-slot="{ doc }">
                    <ContentRenderer :value="doc" />
                </ContentDoc>
            </p>
        </div>
    </div>
</template>