import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthContextProvider from "../store/context/AuthContext";
import "../styles/globals.css";
import theme from "../theme/theme";

const myTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<ChakraProvider theme={myTheme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
