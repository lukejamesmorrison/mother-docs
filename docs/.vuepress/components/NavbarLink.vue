<template>
    <a :href="link" target="_blank" rel="noopener noreferrer">
      <font-awesome-icon :icon="icon" />
      <!-- {{ text }} -->
    </a>
  </template>
  
  <script>
  export default {
    props: {
      text: String,
      link: String,
      icon: String
    }
  }
  </script>