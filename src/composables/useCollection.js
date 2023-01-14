import { ref } from "vue";
import { projectFirestore } from "../firebase/config";




export const useCollection =  (collection) => {

      // error is inside of the function becase we need new error for each type of collection we will use this function for (ex. blogs, docs, chats...).
      const error = ref(null)


      const addDoc = async (doc) => {

            //reset the error
            error.value = null
            try {
                  await projectFirestore.collection(collection).add(doc)

                  
            } catch (error) {
                  console.log(error.message);
                  error.value = 'Could not send the message.'
                  
            }
      }
      return {
            addDoc,
            error
      }
}