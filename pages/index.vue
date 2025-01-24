<template>
  <section class="hero p-6">
    <div class="mt-[60px] pt-20">
      <h1 class="hero-title text-4xl tracking-wider font-extrabold mb-8">
        La retribución flexible más personalizable
      </h1>
      <h3 class="w-80 mb-8 tracking-wider font-thin">
        La única plataforma que integra retribución flexible, seguros y
        beneficios de bienestar de la forma más cómoda y customizable.
      </h3>
      <div
        class="bg-gray-900/90 text-white w-fit py-4 px-6 rounded-full text-center mb-3 font-bold"
      >
        Habla con un experto
      </div>
      <div
        class="bg-transparent text-white w-fit py-4 px-6 rounded-full text-center border font-bold"
      >
        Calcula tu ahorro
      </div>
    </div>
  </section>
</template>

<script setup>
// definePageMeta({
//   colorMode: "dark",
// });
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  font-family: "Roboto", "sans-serif";
}

.dark-mode body {
  background-color: #1e1f20;
  color: #ebf4f1;
}

.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}

.hero {
  height: 100vh;
  background: url(https://betterfly.com/wp-content/uploads/2024/01/bg_hero2.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.hero .hero-title {
  font-family: "Obviously Narw", "Roboto", sans-serif;
}
</style>
