<script setup>
import { ref } from 'vue';
import { useLogin } from '../composables/useLogin.js';

const { error, login } = useLogin();

const emit = defineEmits('login') 

// refs

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  const res = await login(email.value, password.value);
  const displayName = res.user.displayName

  if (!error.value) {
    console.log('User logged in');
    emit('login', displayName )
    
  }

  return {
    email,
    password,
  };
};

</script>

<template>
  <h2>Log in</h2>
  <form @input="error = null" @submit.prevent="handleSubmit" autocomplete="chrome-off">
    <input
      autocomplete="new-password"
      required
      placeholder="Email"
      type="text"
      v-model="email"
    />
    
    <input
      autocomplete="new-password"
      required
      placeholder="Password"
      type="password"
      v-model="password"
    />
    <!-- dont need v-if because nothing is showed if there is no error -->
    <div class="error">{{ error }}</div>
    <button>log in</button>
  </form>
</template>

<style></style>
