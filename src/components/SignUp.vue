/**
TODO:
- add  "enter as a guest" option. 
- add  goodbye message. 

*/


<script setup>
import { ref } from 'vue';
import { useSignup } from '../composables/useSignup.js';

const { error, signUp } = useSignup();

const emit = defineEmits('signup') 

// refs
const displayName = ref('');
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  await signUp(email.value, password.value, displayName.value);
  if (!error.value) {
    console.log('User logged in');
    emit('signup', displayName )
    
  }

  return {
    displayName,
    email,
    password,
  };
};
</script>

<template>
  <h2>Sign Up</h2>
  <form @submit.prevent="handleSubmit" autocomplete="chrome-off">
    <!-- <label> Display name </label> -->
    <input
      required
      placeholder="Display name"
      type="text"
      v-model="displayName"
    />
    <!-- <label> Email </label> -->
    <input
      autocomplete="new-password"
      required
      placeholder="Email"
      type="text"
      v-model="email"
    />
    <!-- <label> Password </label> -->
    <input
      autocomplete="new-password"
      required
      placeholder="Password"
      type="password"
      v-model="password"
    />

    <!-- dont need v-if because nothing is showed if there is no error -->
    <div class="error">{{ error }}</div>
    <button>Signup</button>
  </form>
</template>

<style></style>
