import { createRouter, createWebHistory } from 'vue-router';

import Welcome from '@/views/Welcome.vue';
import { projectAuth } from '../firebase/config';
// import Chatroom from "../views/Chatroom.vue";

// auth guard

/**
 * When we refresh, user is initally null because it takes a small amount of time to retrive user status from firebase.
 */
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: 'Welcome' });
    return
  }
  next();
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: 'Chatroom' });
    return
  }
  next();
};

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      beforeEnter: requireNoAuth,

    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      // component: Chatroom,
      component: () => import('@/views/Chatroom.vue'),
      beforeEnter: requireAuth,
    },
  ],
});
