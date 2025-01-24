<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-center p-10 text-3xl">Users</h1>

    <div class="">
      <div v-if="isLoading">Loading...</div>
      <div v-if="!isLoading && !tableData.length" class="text-red-500">
        No users found.
      </div>
      <div v-else class="border border-red-400 w-full">
        <el-table :data="tableData" stripe>
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="name" label="Name" width="140" />
          <el-table-column prop="email" label="Email" width="140" />
          <el-table-column prop="createdAt" label="Created" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tableData = ref([]);
const error = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await fetch("/api/users");

    const data = await response.json();

    if (data.error) {
      error.value = data.error;
    } else {
      tableData.value = data.users;
    }
  } catch (err) {
    error.value = "Failed to load users";
  } finally {
    isLoading.value = false;
  }
});
</script>
