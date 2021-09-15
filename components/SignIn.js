import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { loginWithGoogle } from "../lib/auth";

const SignIn = () => {
	const onClickHandler = async () => {
		const [result, error] = await loginWithGoogle();

		if (error) {
			console.log(error.message);
			return;
		}

		console.log("login successfully!", result);
	};

	return (
		<Box height="100vh" display="grid" placeItems="center" width="100%">
			<Button leftIcon={<FaGoogle />} size="lg" onClick={onClickHandler}>
				Sign In Google
			</Button>
		</Box>
	);
};

export default SignIn;
