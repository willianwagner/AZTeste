
<template>
  <main>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h1>Made By Getters .</h1>
      <div v-for="user in getUsers" :key="user.id">
        {{ user.id }} {{ user.email }} {{ user.first_name }}
      </div>
      <h1>Made By Actions</h1>
      <div v-for="user in users" :key="user.id">
        {{ user.id }} {{ user.name }} {{ user.address }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/users";

const store = useUserStore();
const msg = ref("Welcome to my Vuex Store");

const getUsers = computed(() => {
  console.log(store.getUsers.data)
  return store.getUsers.data;
});
const users = computed(() => {
  return store.users;
});
onMounted(() => {
  store.fetchUsers();
});
</script>