<template>
  <aside
    class="fixed -top-[1000px] left-0 w-screen h-screen pt-[100px] z-50 transition-all ease-out duration-300 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
    :class="{
      'translate-y-[1000px]': appStore.menuVisible,
    }"
  >
    <section class="menu-content">
      <div class="menu-links">
        <div v-if="session.data" class="welcome-message">
          Hi {{ session.data.user.name }}!
        </div>

        <NuxtLink
          v-if="!session.data"
          to="/login"
          class="menu-link"
          @click="closeMenu"
        >
          <Button class="menu-button" @click="closeMenu">
            <Icon name="ph:sign-in-bold" class="mr-2" />
            Login
          </Button>
        </NuxtLink>

        <NuxtLink v-else to="/dashboard" class="menu-link" @click="closeMenu">
          <Button size="large" class="menu-button">
            <Icon name="game-icons:settings-knobs" class="mr-2" />
            Dashboard
          </Button>
        </NuxtLink>

        <NuxtLink to="/about" class="menu-link" @click="closeMenu">
          <Button size="large" class="menu-button">
            <Icon name="ph:question-bold" class="mr-2" />
            About Us
          </Button>
        </NuxtLink>

        <Button
          v-if="session.data"
          size="large"
          class="menu-button"
          @click="handleLogout"
        >
          <Icon name="ph:sign-out-bold" class="mr-2" />
          Logout
        </Button>
      </div>
    </section>
  </aside>
</template>

<script setup>
import { useSession, signOut } from "~/lib/auth-client";
import { Button } from "@/components/ui/button";

const appStore = useAppStore();
const router = useRouter();
const session = useSession();

const closeMenu = () => {
  appStore.menuVisible = false;
};

const handleLogout = () => {
  signOut();
  closeMenu();
  router.push("/login");
};
</script>

<style scoped>
.menu-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-link {
  text-decoration: none;
  width: 100%;
}

.menu-button {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(76, 175, 80, 0.8);
    border-color: rgba(76, 175, 80, 0.9);
    transform: scale(1.02);
  }
}
</style>
