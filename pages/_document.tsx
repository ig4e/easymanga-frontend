import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-5B28VN7941"
					strategy="afterInteractive"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#FFFFFF"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#121318"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					
					gtag('config', 'G-5B28VN7941');
				`}
				</Script>


                               <Script id="hotjar-analytics" strategy="afterInteractive">
					{`
				

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3304762,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

				`}
				</Script>

				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5470501595675282"
					crossOrigin="anonymous"
					strategy="beforeInteractive"
				></Script>

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

				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5470501595675282"
					crossOrigin="anonymous"
				></script>	
			</Head>

			<body id="_body" className="transition duration-100">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
