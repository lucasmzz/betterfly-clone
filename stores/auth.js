import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  function setAuth(authData) {
    token.value = authData.token;
    user.value = authData.user;
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("auth_token");
  }

  // Initialize auth state from localStorage
  function init() {
    if (import.meta.client) {
      const savedToken = localStorage.getItem("auth_token");
      if (savedToken) {
        token.value = savedToken;
      }
    }
  }

  function setToken(newToken) {
    if (import.meta.client) {
      localStorage.setItem("auth_token", newToken);
    }
    token.value = newToken;
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
    init,
    setToken,
  };
});
