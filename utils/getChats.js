import {
	limit,
	onSnapshot,
	orderBy,
	query,
	startAfter,
} from "@firebase/firestore";
import { database } from "../lib/firebase";

// get chats on load
export const getChatsOnLoad = async () => {
	try {
		let lastKey = "";
		let chats = [];

		// make the query
		const q = query(
			database.messagesRef,
			orderBy("createdAt", "desc"),
			limit(5)
		);

		// fetch the query
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) =>
				chats.push({ data: doc.data(), id: doc.id })
			);

			console.log("getChats", { chats });

			// reverse the chats
			chats.reverse();

			lastKey = chats.length > 1 ? chats[0].data.createdAt : null;
		});

		return [{ chats, lastKey }, null];
	} catch (error) {
		return [null, error];
	}
};

// Get paginated chats
export const getPaginatedChats = async (key) => {
	try {
		const q = query(
			database.messagesRef,
			orderBy("createdAt", "desc"),
			startAfter(key),
			limit(5)
		);

		console.log({ key });

		let chats = [];
		let lastMessageKey = null;

		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) =>
				chats.push({ data: doc.data(), id: doc.id })
			);
		});

		chats.reverse();

		console.log({ chats });

		if (chats.length > 0) {
			lastMessageKey = chats[0].data.createdAt;

			return [{ chats, lastMessageKey }, null];
		}

		return [{ chats: [], lastMessageKey: null }, null];
	} catch (error) {
		console.log(error.message);
		return [null, error];
	}
};
