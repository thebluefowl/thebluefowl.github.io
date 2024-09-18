<template>
    <div>
    <Header/>
    <div class="h-full w-full flex justify-center bg-red font-custom-serif">  
        <div class="px-8 sm:w-full sm:px-8 xl:w-1/2 2xl:w-1/2">
            <slot name="header" />
            <slot name="body"/>
        </div>
    </div>
</div>
</template>

