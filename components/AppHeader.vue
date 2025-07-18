<template>
  <header
    class="h-[62px] w-screen fixed top-0 bg-transparent flex items-center justify-between px-4 z-60"
  >
    <div>
      <NuxtImg
        src="/img/logo_white.svg"
        alt="BetterFly logo"
        class="w-[136px] h-[24px]"
      />
    </div>

    <div class="h-full flex items-center gap-4">
      <NuxtLink to="/login">
        <p
          class="text-black text-xs px-5 py-2 bg-green-600 rounded-2xl w-[156px]"
        >
          Hablá con un experto
        </p>
      </NuxtLink>

      <Button
        class="group h-10 w-10 flex items-center justify-center"
        @click="toggleMenu"
      >
        <div class="grid justify-items-center gap-1.5">
          <span
            class="h-1 w-8 rounded-full transition-transform duration-[300ms]"
            :class="
              appStore.menuVisible
                ? 'rotate-45 translate-y-2.5 bg-green-600 border-green-600 '
                : 'bg-white'
            "
          />
          <span
            class="h-1 w-8 rounded-full transition-transform duration-[300ms]"
            :class="
              appStore.menuVisible
                ? 'scale-x-0 border-green-600 bg-green-600'
                : 'bg-white'
            "
          />
          <span
            class="h-1 w-8 rounded-full transition-transform duration-[300ms]"
            :class="
              appStore.menuVisible
                ? '-rotate-45 -translate-y-2.5 bg-green-600 border-green-600'
                : 'bg-white'
            "
          />
        </div>
      </Button>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const toggleMenu = () => (appStore.menuVisible = !appStore.menuVisible);
</script>
