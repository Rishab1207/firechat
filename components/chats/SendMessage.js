import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { getAuth } from "@firebase/auth";
import { addDoc } from "@firebase/firestore";
import { AES } from "crypto-js";
import React, { useState } from "react";
import { app, database } from "../../lib/firebase";

const auth = getAuth(app);

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

export default SendMessage;
