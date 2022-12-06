import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="theme-color" content="#FFFFFF" />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<meta
					property="og:image"
					content="/assets/logo-1024x1024.png"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-5B28VN7941"
				strategy="afterInteractive"
			/>

			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		
		  gtag('config', 'G-5B28VN7941');
        `}
			</Script>
		</Html>
	);
}
