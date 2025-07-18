<template>
  <section class="login-container">
    <div class="form-wrapper">
      <div class="logo-container">
        <NuxtImg
          src="/img/logo_white.svg"
          alt="BetterFly logo"
          class="w-[200px] h-[36px]"
        />
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{{ error }}</p>
          </AlertDescription>
        </Alert>

        <div class="relative w-full max-w-sm items-center">
          <Input
            v-model="email"
            type="email"
            placeholder="Email"
            size="large"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Icon name="tabler:mail" class="size-6 text-muted-foreground" />
          </span>
        </div>

        <div class="relative w-full max-w-sm items-center">
          <Input
            v-model="password"
            type="password"
            placeholder="Password"
            size="large"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Icon
              name="tabler:lock-password"
              class="size-6 text-muted-foreground"
            />
          </span>
        </div>

        <Button
          variant="primary"
          native-type="submit"
          size="large"
          class="submit-btn"
        >
          Login
        </Button>

        <small class="register-link">
          Not enrolled yet?
          <NuxtLink class="font-bold" to="/register">Register now!</NuxtLink>
        </small>

        <!-- <div class="divider">
          <span>or continue with</span>
        </div> -->

        <div class="social-login">
          <Button
            class="social-icon"
            @click.prevent="loginWithGoogle"
            :disabled="isLoggingGoogle"
          >
            <Icon v-if="!isLoggingGoogle" name="tabler:brand-google" />
            <Icon v-else name="tabler:loader" class="animate-spin" />
            Login with Google
          </Button>

          <Button class="social-icon" disabled>
            <Icon name="tabler:brand-apple" />
            Login with Apple
          </Button>

          <Button class="social-icon" disabled>
            <Icon name="tabler:brand-facebook" />
            Login with Facebook
          </Button>
        </div>
      </form>

      <NuxtLink to="/" class="home-link">Back to Home</NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signIn } from "~/lib/auth-client";

definePageMeta({
  layout: "login",
});

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const isLoggingGoogle = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    await signIn.email(
      {
        email: email.value,
        password: password.value,
        callbackURL: "/",
        rememberMe: false,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (e) => {
          console.log(e.error.message);
          error.value = e.error.message;
        },
      }
    );
  } catch (e) {
    console.log(e);
    error.value = e.data?.message || "An error occurred during login";
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = async () => {
  isLoggingGoogle.value = true;
  await signIn.social({
    provider: "google",
  });
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
  gap: 0.5rem;
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  border: none;
  cursor: pointer;
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
  margin-bottom: 1.5rem;
  text-align: end;
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
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.social-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 250px;
}

.social-icon:hover {
  transform: scale(1.05);
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
