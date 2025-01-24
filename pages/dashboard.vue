<template>
  <section class="dashboard-container">
    <div class="form-wrapper">
      <h1>User Dashboard</h1>
      <form @submit.prevent="handleSubmit" class="dashboard-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="form-input"
          />
        </div>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="success" v-if="success">{{ success }}</div>
        <button type="submit" class="submit-btn">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: "auth",
});

const auth = useAuthStore();
const name = ref("");
const email = ref("");
const error = ref("");
const success = ref("");

onMounted(() => {
  if (auth.user) {
    name.value = auth.user.name;
    email.value = auth.user.email;
  }
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  try {
    const response = await fetch("/api/auth/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to update profile");
    }

    const data = await response.json();
    auth.updateUser(data.user);
    success.value = "Profile updated successfully";
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<style scoped>
.dashboard-container {
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

.dashboard-form {
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
  color: #ff4444;
  font-size: 0.9rem;
}

.success {
  color: #4caf50;
  font-size: 0.9rem;
}
</style>
