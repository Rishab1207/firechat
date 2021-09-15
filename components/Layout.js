import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
	return (
		<Flex
			direction="column"
			justifyContent="space-between"
			minHeight="100vh"
			background="#12181b"
			overflowY="hidden"
			width={{ sm: "95%", md: "70%" }}
		>
			{children}
		</Flex>
	);
};

export default Layout;
