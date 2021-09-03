import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app, provider } from "./firebase";

// login with google

const loginWithGoogle = async () => {
	const auth = getAuth(app);

	try {
		const result = await signInWithPopup(auth, provider);

		return [result, null];
	} catch (error) {
		return [null, error];
	}
};

// login with mobile phone

// signout an user
const logOut = async () => {
	const auth = getAuth(app);

	try {
		const result = await signOut(auth);

		return [result, null];
	} catch (error) {
		console.log(error.message);
		return [null, error];
	}
};

export { loginWithGoogle, logOut };
