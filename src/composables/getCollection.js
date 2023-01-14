
import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

export const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy('createdAt');


    // returns unsubscribe function.
    // more: https://firebase.google.com/docs/firestore/query-data/listen#web-version-8_5
  const unsub = collectionRef.onSnapshot(
        (snap) => {
          console.log('snapshot');
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'Could not fetch data !';
    }
  );

  watchEffect((onInvalidate) => {


      // when component unmounts.
      onInvalidate(() => {
            console.log(unsub);
            unsub()
      })


  });

  return {
    documents,
    error,
  };
};
