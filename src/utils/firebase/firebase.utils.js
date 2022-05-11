import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAtuRpnntlmWVtQYo_ozKYoOx5phauGIps',
	authDomain: 'clothes-db-f796a.firebaseapp.com',
	projectId: 'clothes-db-f796a',
	storageBucket: 'clothes-db-f796a.appspot.com',
	messagingSenderId: '383268422527',
	appId: '1:383268422527:web:948c08e47e1dff8aab904a',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	authUser,
	additionalInformation
) => {
	if (!authUser) return;

	const userDocRef = doc(db, 'users', authUser.uid);
	const userSnapShot = await getDoc(userDocRef);

	// if user doesn't exist, create a new one
	if (!userSnapShot.exists()) {
		const { displayName, email } = authUser;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error);
		}
	}

	// if user exist
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
