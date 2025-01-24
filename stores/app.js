import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const menuVisible = ref(false);
  return { menuVisible };
});
