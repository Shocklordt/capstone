import { initializeApp } from "firebase/app"
import { getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        signInWithEmailAndPassword } from "firebase/auth"
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
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
      prompt: "select_account"

  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await  setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log("error creating the user", error.message)
        }
    }
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
  }