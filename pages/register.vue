<template>
  <section class="login-container">
    <div class="form-wrapper">
      <h1>Register</h1>
      <form class="register-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="form-input"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-input"
          >
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="form-input"
          >
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="submit-btn">Register</button>
      </form>
      <div class="login-link">
        Already have an account? <NuxtLink to="/login">Login here</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { signUp } from "~/lib/auth-client";

definePageMeta({
  layout: "login",
});

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const handleSubmit = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    const { error: signUpError } = await signUp.email(
      {
        email: email.value,
        password: password.value || "1234abcd",
        name: email.value,
        image:
          "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png", // User image URL (optional)
        callbackURL: "/",
        // Ensure password is always passed to backend for user creation
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("registering...", ctx);
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          navigateTo("/login");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
    if (signUpError) {
      error.value = signUpError.message;
    }
  } catch (e) {
    error.value = e.message;
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
}

.form-wrapper {
  border-radius: 12px;
  background: rgb(255, 255, 255, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #4a90e2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #357abd;
}

.error {
  color: #ff6b6b;
  margin-top: 0.5rem;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
}

.login-link a {
  color: #4a90e2;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
