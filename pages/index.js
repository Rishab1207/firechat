import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../store/context/AuthContext";
import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";
import ChatUI from "../components/chats/ChatUI";

export default function Home() {
	const { user } = useContext(AuthContext);

	console.log("user", user);

	return (
		<Layout>
			<Head>
				<title>FireChat</title>
				<meta name="description" content="Next JS Chat Application" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				minHeight="100vh"
				width={{ sm: "95%", md: "70%" }}
				mx="auto"
				background="#2a2e35"
			>
				<Navbar />

				<Box height="100%">
					{user && user.currentUser ? <ChatUI /> : <SignIn />}
				</Box>
			</Box>
		</Layout>
	);
}
