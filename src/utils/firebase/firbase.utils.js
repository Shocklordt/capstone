import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBT6DvG9b9MYsWnh6CD1aYrFdpVlKc6h2Y",
    authDomain: "schk-cl-db.firebaseapp.com",
    projectId: "schk-cl-db",
    storageBucket: "schk-cl-db.appspot.com",
    messagingSenderId: "169770146022",
    appId: "1:169770146022:web:a2a31908f8f3e911324327"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
      prompt: "select_account"

  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await  setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log("error creating the user", error.message)
        }
    }
    return userDocRef
    // if user data does not exist
    // create / set the document with the data from userAuth in my collection

    
    // check if user data exists
    // return userDocRef
  }