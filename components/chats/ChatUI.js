import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";

const ChatUI = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(0);

	const onClickHandler = () => console.log("riah");

	return (
		<Box position="relative">
			{/* Chat Message */}
			<Stack spacing={8} padding={5}>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						ciphertext={message.data.text}
						uid={message.data.uid}
						photoUrl={message.data.photoUrl}
						currentUserId={auth.currentUser.uid}
					/>
				))}

				<Button onClick={onClickHandler}>Click Me ☺</Button>
			</Stack>
			{/* Send Message */}
			<Box position="absolute" width="100%" bottom={0} left={0}>
				<SendMessage />
			</Box>

			<div></div>
		</Box>
	);
};

export default ChatUI;
