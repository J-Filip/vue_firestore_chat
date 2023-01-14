import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

// if logged in, get that user
const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((changedUser) => {
  console.log('Current user:', changedUser);
  user.value = changedUser;
});

export const getUser = () => {
  return {
    user,
  };
};
