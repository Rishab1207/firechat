import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../../lib/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const auth = getAuth(app);

	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("user ", user);

				setUser({ currentUser: user.uid });
			} else {
				console.log("no signed in user");
				setUser({ currentUser: null });
			}
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
