<script setup>
import { useLogout } from '../composables/useLogout';
import { getUser } from '../composables/getUser';

import { useRouter } from 'vue-router';


const router = useRouter();
const emit = defineEmits('logout') 


const { error, logout } = useLogout();
const {user} = getUser()

const userLogout = async () => {
  await logout();
  if (!error.value) {
    console.log('User logged out');
    // ? emit logout event and listen on chatroom ?
//     emit('logout')
  }
};
</script>

<template>
  <nav v-if="user">
    <div>
      <p>Hey. It's {{ user.displayName}}</p>
      <p class="email">Logged in with: {{ user.email}}</p>
    </div>
    <button @click="userLogout" class="logout">Logout</button>
  </nav>
</template>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
