<template>
    <div class="relative h-screen">
        <Header/>
        
        <div class="h-full w-full  p-16 flex justify-center font-garamond">  
            <div class="w-full sm:w-full sm:px-8 xl:w-1/2 2xl:w-1/2">
                <slot name="header" />
                <slot name="body"/>
            </div>
        </div>
        <Footer/>
    </div>
</template>

