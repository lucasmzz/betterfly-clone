// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@element-plus/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    ["@nuxtjs/robots", { configPath: "~/config/robots.config" }],
    "@pinia/nuxt",
  ],
  colorMode: {
    preference: "dark", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/users": { ssr: true },
  },
});