# Todo

- Encrypt and decrypt messages
- only 25 messages are showing up
- Input is not fixed
- Reverse the order on avatar
- Reduce the message size width

# Pagination of chats

- On component mount fetch first 25 chats in reverse order `desc`
- Initially when a button is clicked then fetch the next 25 chats

```js
if (lastMessageKey !== null) {
	const [data, error] = await getPaginatedChats(lastMessageKey);

	if (error) {
		console.log(error.message);
		return;
	}
}
```

- When I get the old chats add those chats in the `messages` state in reverse order at the end
