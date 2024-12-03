import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import '../styles/globals.css'; // Adjusted path if necessary

export default function App({ Component, pageProps }) {
  return (
	<>
	  <Head>
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	  </Head>
	  <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange>
		<Component {...pageProps} />
	  </ThemeProvider>
	</>
  );
}