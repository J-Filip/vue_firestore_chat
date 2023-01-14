import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

const signUp = async (email, password, displayName) => {
      
  // reset error value.
  error.value = null;
  try {
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!response) {
      throw new Error('Failed signup!');
    }
    await response.user.updateProfile({ displayName });
    error.value = null;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

export const useSignup = () => {
  return {
    error,
    signUp,
  };
};
