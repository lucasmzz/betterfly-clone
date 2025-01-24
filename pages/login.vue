<template>
  <section class="login-container">
    <div class="form-wrapper">
      <div class="logo-container">
        <img
          src="/img/logo_white.svg"
          alt="BetterFly logo"
          class="w-[200px] h-[36px]"
        />
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <el-alert
          v-if="error"
          :title="error"
          type="error"
          :closable="false"
          class="mb-4"
        />
        <el-input v-model="email" type="email" placeholder="Email" size="large">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>

        <el-input
          v-model="password"
          type="password"
          placeholder="Password"
          size="large"
          show-password
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>

        <el-button
          type="primary"
          native-type="submit"
          size="large"
          class="submit-btn"
        >
          Login
        </el-button>

        <div class="register-link">
          Not enrolled yet? <NuxtLink to="/register">Register now!</NuxtLink>
        </div>

        <div class="divider">
          <span>or continue with</span>
        </div>

        <div class="social-login">
          <button class="social-icon">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              class="w-8 h-8"
            />
          </button>
          <button class="social-icon">
            <img
              src="https://www.facebook.com/favicon.ico"
              alt="Facebook"
              class="w-8 h-8"
            />
          </button>
          <button class="social-icon">
            <img
              src="https://www.apple.com/favicon.ico"
              alt="Apple"
              class="w-8 h-8"
            />
          </button>
        </div>
      </form>

      <NuxtLink to="/" class="home-link">Back to Home</NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Message, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "login",
});

const router = useRouter();
const auth = useAuthStore();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    auth.setAuth(response);
    // Let the auth store handle token storage
    auth.setToken(response.token);
    router.push("/");
  } catch (e) {
    error.value = e.data?.message || "An error occurred during login";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  padding: 1em;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.form-wrapper {
  border-radius: 12px;
  background: rgb(255, 255, 255, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  backdrop-filter: blur(10px);
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-btn {
  margin-top: 1rem;
  background-color: #4caf50;
  border: none;
}

.submit-btn:hover {
  background-color: #45a049;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: transparent;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.register-link {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.register-link a {
  color: #4caf50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.social-icon:hover {
  transform: scale(1.2);
}

.home-link {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
}

.home-link:hover {
  color: rgba(255, 255, 255, 0.8);
}
</style>
