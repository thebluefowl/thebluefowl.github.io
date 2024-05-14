<template>
  <ContentDoc v-slot="{ doc }">
    <div class="w-full">
          <img src="/images/about.jpg" alt="about" class="w-full">
    </div>
    <div class="flex mt-16 p-8 pt-0 w-full justify-center">
        <div class="w-2/4">
            <h1 class="text-8xl font-bold text-center">
                {{ doc.title }}
            </h1>
            <div class="text-center">
                <div class="mt-4">
                    <div class="text-lg">Travel</div>
                    <span class="text-lg font-sans">23.9.2022</span>
                </div>
            </div>
            <div class="markdown">              
              <ContentRenderer :value="doc" />
            </div>
        </div>
    </div>
  </ContentDoc>
</template>