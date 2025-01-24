<template>
  <section class="layout-container">
    <AppHeader />
    <AppMenu />
    <main>
      <slot />
    </main>
    <!-- <AppFooter /> -->
  </section>
</template>

<style scoped>
.layout-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 50px 1fr 100px;
  min-height: 100vh;
}

.layout-container main {
  grid-column: span 5;
}
</style>
