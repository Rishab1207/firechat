import { Box, Flex, Stack } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import { getAuth } from "@firebase/auth";
import { app, database } from "../../lib/firebase";
import { limit, onSnapshot, orderBy, query } from "@firebase/firestore";
import styles from "../../styles/ChatUI.module.css";

const auth = getAuth(app);

const ChatUI = () => {
	const [messages, setMessages] = useState([]);

	const divRef = useRef(null);

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

			divRef.current.scrollIntoView({ behavior: "smooth" });
		});

		return () => console.log("cleanup!");
	}, []);

	return (
		<Flex direction="column" position="relative" height="87vh">
			{/* Chat Message */}
			<Stack
				overflowY="scroll"
				spacing={8}
				padding={5}
				className={styles.overflow}
			>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						ciphertext={message.data.text}
						uid={message.data.uid}
						photoUrl={message.data.photoUrl}
						currentUserId={auth.currentUser.uid}
					/>
				))}

				<div ref={divRef}></div>
			</Stack>
			{/* Send Message */}
			<Box mt="auto">
				<SendMessage divRef={divRef} />
			</Box>
		</Flex>
	);
};

export default ChatUI;
