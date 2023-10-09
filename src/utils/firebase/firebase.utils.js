import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBbUdnDFdKxIZ16Muk00OhZdRHoojFFZK0",
    authDomain: "crwn-clothing-db1-3e19f.firebaseapp.com",
    projectId: "crwn-clothing-db1-3e19f",
    storageBucket: "crwn-clothing-db1-3e19f.appspot.com",
    messagingSenderId: "438600698304",
    appId: "1:438600698304:web:9388e65ef5439c633f2025",
    measurementId: "G-922EJPQSTJ"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    // if user data does not exists

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
    // if user data exists

    // return userDocRef 
}