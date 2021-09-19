import { Avatar } from "@chakra-ui/avatar";
import { Stack, Text } from "@chakra-ui/layout";
import CryptoJS, { AES } from "crypto-js";
import React from "react";

const ChatMessage = ({
	name = "Anonymous",
	ciphertext = "Hi Mom 👋",
	timeStamp,
	uid,
	photoUrl,
	currentUserId,
}) => {
	const bytes = AES.decrypt(ciphertext, process.env.NEXT_PUBLIC_SECRET_KEY);
	const message = bytes.toString(CryptoJS.enc.Utf8);

	return (
		<Stack
			direction="row"
			alignItems="center"
			alignSelf={uid === currentUserId ? "flex-end" : "flex-start"}
		>
			<Avatar name={name} src={photoUrl} />
			<Text background="white" borderRadius="md" padding={3}>
				{message}
			</Text>
		</Stack>
	);
};

export default ChatMessage;
