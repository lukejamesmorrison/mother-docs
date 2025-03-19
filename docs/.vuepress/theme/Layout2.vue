<template>
    <div class="custom-home">
      <HomeHero /> <!-- Existing Hero Section -->
  
      <!-- First Content Section -->
      <section class="content-section">
        <h2>First Section</h2>
        <p>This is the first additional cont
            ent section.</p>
      </section>
  
      <!-- Second Content Section -->
      <section class="content-section">
        <h2>Second Section</h2>
        <p>This is the second additional content section.</p>
      </section>
  
      <Content /> <!-- VuePress Main Content -->
    </div>
  </template>
  
  <style scoped>
  .content-section {
    padding: 2rem;
    text-align: center;
  }
  </style>
  