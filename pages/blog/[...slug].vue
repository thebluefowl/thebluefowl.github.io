<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <Content :content="doc"/>
    </ContentDoc>
  </NuxtLayout>
</template>
