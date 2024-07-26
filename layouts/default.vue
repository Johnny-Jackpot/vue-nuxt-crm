<script setup lang="ts">

</script>

<template>
  <section class="dashboard">
    <LayoutSidebar />
    <div>
      <slot/>
    </div>
  </section>
</template>

<style scoped>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 6fr;
    min-height: 100vh;
  }
</style>