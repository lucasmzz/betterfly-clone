<template>
  <aside
    class="fixed -top-[1000px] left-0 w-screen h-screen pt-[100px] -z-1 transition-all ease-out duration-300 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
    :class="{
      'translate-y-[1000px]': appStore.menuVisible,
    }"
  >
    <section class="menu-content">
      <div class="menu-links">
        <div v-if="auth.isAuthenticated" class="welcome-message">
          Hi {{ auth.user?.name }}!
        </div>
        <NuxtLink
          v-if="!auth.isAuthenticated"
          to="/login"
          @click="closeMenu"
          class="menu-link"
        >
          <el-button size="large" class="menu-button">
            <el-icon class="mr-2"><User /></el-icon>
            Login
          </el-button>
        </NuxtLink>

        <NuxtLink
          v-if="auth.isAuthenticated"
          to="/dashboard"
          @click="closeMenu"
          class="menu-link"
        >
          <el-button size="large" class="menu-button">
            <el-icon class="mr-2"><Setting /></el-icon>
            Dashboard
          </el-button>
        </NuxtLink>

        <NuxtLink to="/about" @click="closeMenu" class="menu-link">
          <el-button size="large" class="menu-button">
            <el-icon class="mr-2"><InfoFilled /></el-icon>
            About Us
          </el-button>
        </NuxtLink>

        <el-button
          v-if="auth.isAuthenticated"
          size="large"
          class="menu-button"
          @click="handleLogout"
        >
          <el-icon class="mr-2"><SwitchButton /></el-icon>
          Logout
        </el-button>
      </div>
    </section>
  </aside>
</template>

<script setup>
import {
  User,
  InfoFilled,
  SwitchButton,
  Setting,
} from "@element-plus/icons-vue";
const appStore = useAppStore();
const auth = useAuthStore();
const router = useRouter();

// Initialize auth state
auth.init();

const closeMenu = () => (appStore.menuVisible = false);

const handleLogout = () => {
  auth.clearAuth();
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

  &:hover {
    background: rgba(76, 175, 80, 0.8);
    border-color: rgba(76, 175, 80, 0.9);
    transform: translateY(-2px);
  }
}
</style>
