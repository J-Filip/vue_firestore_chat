import { ref } from 'vue';
import { projectAuth } from '../firebase/config';


// error is declared once since only one type of error can happen.
const error = ref(null);

const logout = async () => {
  error.value = null;

  try {
    await projectAuth.signOut();
  } catch (err) {
    console.log(err);
    error.value = error.message;
  }
};

export const useLogout = () => {
  return {
    error,
    logout,
  };
};
