<script setup>
import Navbar from '../components/Navbar.vue';
import NewChatForm from '../components/NewChatForm.vue';

import { useRouter } from 'vue-router';
import { projectAuth } from '../firebase/config';
import { getUser } from '../composables/getUser';
import { watch } from '@vue/runtime-core';

const router = useRouter();

const { user } = getUser();

watch(user, () => {
  if (!user.value) {
    router.push({ name: 'Welcome' });
  }
});
</script>


<template>
  <div class="container">
    <!--  listen to logout event, route to home  -->
    <Navbar @logout="returnHome" />

    <NewChatForm/> 
  </div>
</template>

<style></style>
