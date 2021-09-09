import { Button } from "@chakra-ui/button";
import { Heading, Stack } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { logOut } from "../lib/auth";
import { AuthContext } from "../store/context/AuthContext";

const Navbar = () => {
	const { user } = useContext(AuthContext);

	const logoutHandler = async () => {
		const [result, error] = await logOut();

		if (error) {
			console.log(error.message);
			return;
		}

		console.log("user logged out successfully!");
	};

	return (
		<>
			<Stack
				padding={5}
				background="#181717"
				direction="row"
				justifyContent="space-between"
			>
				<Heading color="white">FireChat 🔥</Heading>
				{user && user.currentUser && (
					<Button onClick={logoutHandler}>Signout</Button>
				)}
			</Stack>
		</>
	);
};

export default Navbar;
