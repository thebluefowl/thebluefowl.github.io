<template>
    <div class="error-page">
      <h1 v-if="error.statusCode === 404">Page Not Found</h1>
      <p v-if="error.statusCode === 404">Sorry, the page you are looking for does not exist.</p>
  
      <!-- Handle other types of errors -->
      <template v-else>
        <h1>Oops! Something went wrong.</h1>
        <p>{{ error.message }}</p>
      </template>
  
      <nuxt-link to="/">Go back to Home</nuxt-link>
    </div>
    <Footer/>
  </template>
  
  <script setup>
  defineProps(['error'])
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  