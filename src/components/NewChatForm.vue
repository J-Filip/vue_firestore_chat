<script setup>
import { ref } from 'vue';

import ChatWindow from '../components/ChatWindow.vue';

import { getUser } from '../composables/getUser';
import { useCollection } from '../composables/useCollection';
import { timestamp } from '../firebase/config';

const message = ref('');
const { user } = getUser();

const { error, addDoc } = useCollection('messages');

const handleSubmitMessage = async () => {
  const chat = {
    createdAt: timestamp(),
    message: message.value,
    user: user.value.displayName,
  };

  addDoc(chat);
  if (!error.value) {
    message.value = '';
  }
};
</script>

<template>
  <ChatWindow />
  <form>
    <textarea
      @keypress.enter.prevent="handleSubmitMessage"
      v-model="message"
      placeholder="Type a message..."
    ></textarea>
    <button @click.prevent="handleSubmitMessage">SEND</button>

    <div class="error">
      {{ error }}
    </div>
  </form>
</template>

<!-- scoped style because we have forms in login already -->
<style scoped>
form {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
  resize: none;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(87, 88, 88);
  opacity: 0.6; /* Firefox */
}

button {
  margin: 5px;
}
</style>
