import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

// ne trebamo stvarat novui instancu ove funkcije svaki put kad ju koristimo
const login = async (email, password) => {
  // reset error value.
  error.value = null;

  try {
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );

    // on success.
    error.value = null;
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

export const useLogin = () => {
  return {
    error,
    login,
  };
};
