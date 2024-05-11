<template>
  <ContentDoc v-slot="{ doc }">
    <div>image</div>
    <div class="flex items-center justify-center w-full">
        <div class="w-3/4">
            <h1 class="text-8xl text-center">
                {{ doc.title }}
            </h1>
            <div class="text-center">
                <div>
                    <div class="text-md p-8">Travel</div>
                    <span class="text-xl p-8 font-sans">23.9.2022</span>
                </div>
                
            </div>
            <div class="markdown">              
              <ContentRenderer :value="doc" />
            </div>
        </div>
    </div>
  </ContentDoc>
</template>