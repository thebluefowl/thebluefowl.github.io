<template>
    <div class="error-page">
      <h1 v-if="error.statusCode === 404">Page Not Found</h1>
      <p v-if="error.statusCode === 404">Sorry, the page you are looking for does not exist.</p>
  
      <!-- Handle other types of errors -->
      <h1 v-else>Oops! Something went wrong.</h1>
      <p v-else>{{ error.message }}</p>
  
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
  