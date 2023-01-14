/**
TODO:
- style send button.
- dont send & disable button - if input empty  
- add component: list of things to improve.
*/ 



<script setup>
import { formatDistanceToNow } from 'date-fns';
import { ref, computed, onMounted, onUpdated } from 'vue';
import { getCollection } from '../composables/getCollection';

const chatDiv = ref(null);

const { error, documents } = getCollection('messages');

const formatedDocuments = computed(() => {
  return documents.value.map((doc) => {
    let time = formatDistanceToNow(doc.createdAt.toDate(), { addSuffix: true });

    // we overrride original createdAt property with time.
    return {
      ...doc,
      createdAt: time,
    };
  });
});

// auto scroll to chat window bottom.

onUpdated(() => {
  console.log(documents.value.length);
  if (chatDiv.value != null) {
    let el = chatDiv.value;
    el.scrollTop = el.scrollHeight;
  }
});
</script>

<template>
  <div class="chat-window">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div
      ref="chatDiv"
      v-if="documents && documents.length > 1"
      class="messages"
    >
      <div v-for="doc in formatedDocuments" :key="doc.id" class="single-doc">
        <span class="created-at">
          {{ doc.createdAt }}
        </span>
        <span class="name">
          {{ doc.user }}
        </span>
        <span class="message">
          {{ doc.message }}
        </span>
      </div>
    </div>
    <div v-else>No chat history</div>
  </div>
</template>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single-doc {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
