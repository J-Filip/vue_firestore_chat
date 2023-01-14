<script setup>
import SignUp from '../components/SignUp.vue';
import Login from '../components/Login.vue';
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const showLogin = ref(true);

const router = useRouter();

const enterChat = (displayName) => {
  router.push({ name: 'Chatroom' });
};
</script>

<template>
  <!-- <router-link :to="{ name: 'Chatroom' }">Chat</router-link> -->
  <div class="about">
    <p>📢 Project is stable but still in progress.</p>
  </div>
  <div class="welcome container">
    <h1>Welcome humans! Join us.</h1>

    <div v-if="showLogin">
      <SignUp @signup="enterChat" />
      Already have an acoount?
      <a @click="showLogin = false"> Log in</a>
    </div>
    <div v-else>
      <Login @login="enterChat" />
      No acoount?
      <a @click="showLogin = true"> Sign Up</a>
    </div>
  </div>
</template>

<style>
.about {
  display: flex;
  justify-content: center;
}
h1 {
  color: #5ae4ca;
  font-weight: 800;
}
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome button {
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}

::placeholder {
  color: rgba(153, 153, 153, 0.411);
}
</style>
