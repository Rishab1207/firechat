import {
	Avatar,
	Box,
	Button,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { FaGoogle } from "react-icons/fa";
import { loginWithGoogle, logOut } from "../lib/auth";
import { getAuth } from "firebase/auth";
import { app, database } from "../lib/firebase";
import { AuthContext } from "../store/context/AuthContext";
import { addDoc, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";

const auth = getAuth(app);

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

				{user && user.currentUser ? (
					<>
						<ChatUI />
					</>
				) : (
					<SignIn />
				)}
			</Box>
		</Layout>
	);
}

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

const ChatUI = () => {
	const [messages, setMessages] = useState([]);
	const dummy = useRef();

	let chats;

	useEffect(() => {
		const q = query(
			database.messagesRef,
			orderBy("createdAt", "desc"),
			limit(30)
		);

		onSnapshot(q, (querySnapshot) => {
			chats = [];

			querySnapshot.forEach((doc) =>
				chats.push({ data: doc.data(), id: doc.id })
			);

			chats.reverse();

			setMessages(chats);
		});

		return () => console.log("cleanup!");
	}, []);

	return (
		<Stack position="relative" height="100%">
			{/* Chat Message */}
			<Stack spacing={8} padding={5}>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						ciphertext={message.data.text}
						uid={message.data.uid}
						photoUrl={message.data.photoUrl}
					/>
				))}
			</Stack>
			{/* Send Message */}
			<Box>
				<SendMessage dummy={dummy} />
			</Box>

			<div ref={dummy}></div>
		</Stack>
	);
};

const ChatMessage = ({
	name = "Anonymous",
	ciphertext = "Hi Mom 👋",
	timeStamp,
	uid,
	photoUrl,
}) => {
	const bytes = AES.decrypt(ciphertext, process.env.NEXT_PUBLIC_SECRET_KEY);
	const message = bytes.toString(CryptoJS.enc.Utf8);

	return (
		<Stack
			direction="row"
			alignItems="center"
			alignSelf={uid === auth.currentUser.uid ? "flex-end" : "flex-start"}
		>
			<Avatar name={name} src={photoUrl} />
			<Text background="white" borderRadius="md" padding={3}>
				{message}
			</Text>
		</Stack>
	);
};

const SendMessage = () => {
	const [message, setMessage] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		console.log("send message");

		const messagesRef = await addDoc(database.messagesRef, {
			text: AES.encrypt(message, process.env.NEXT_PUBLIC_SECRET_KEY).toString(),
			createdAt: database.timeStamp,
			uid: auth.currentUser.uid,
			photoUrl: auth.currentUser.photoURL,
			userName: auth.currentUser.displayName,
		});

		console.log("Document written with ID: ", messagesRef.id);

		setMessage("");
	};

	return (
		<form onSubmit={sendMessage}>
			<InputGroup size="lg">
				<Input
					pr="4.5rem"
					value={message}
					borderRadius="0"
					placeholder="Send something..."
					onChange={(e) => setMessage(e.target.value)}
					color="white"
				/>
				<InputRightElement>
					<Button
						h="100%"
						borderRadius="0"
						disabled={message.length > 0 ? false : true}
						type="submit"
					>
						➡
					</Button>
				</InputRightElement>
			</InputGroup>
		</form>
	);
};

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
		<>
			<Box height="100vh" display="grid" placeItems="center" width="100%">
				<Button leftIcon={<FaGoogle />} size="lg" onClick={onClickHandler}>
					Sign In Google
				</Button>
			</Box>
		</>
	);
};
