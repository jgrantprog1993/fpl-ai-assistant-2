import { ThemeProvider } from 'next-themes';
import '../styles/globals.css'; // Adjusted path if necessary

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}