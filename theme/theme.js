import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		body: "'Poppins', sans-serif",
		heading: "'Poppins', sans-serif",
		mono: "'Poppins', sans-serif",
	},
	colors: {
		primary: {
			50: "#e2e9ff",
			100: "#b2beff",
			200: "#7f93ff",
			300: "#4d67ff",
			400: "#1d3cfe",
			500: "#0522e5",
			600: "#001bb3",
			700: "#001381",
			800: "#000a50",
			900: "#000420",
		},
	},

	components: {
		Button: {
			baseStyle: {
				borderRadius: 0,
				colorScheme: "primary",
			},
		},
	},
});

// #2276fc, 121923, 1c2430

export default theme;
