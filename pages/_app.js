import "@/styles/globals.css";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Little Lemon | Chicago</title>
        <meta name="description" content="Little Lemon – An authentic Mediterranean restaurant in Chicago offering delicious specialties." />
        <meta name="keywords" content="Restaurant, Chicago, Little Lemon, Food, Mediterranean, Menu" />
        <meta name="author" content="Little Lemon Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Little Lemon | Chicago" />
        <meta property="og:description" content="Enjoy the best Mediterranean specialties in the heart of Chicago!" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Little Lemon" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Little Lemon | Chicago" />
        <meta name="twitter:description" content="Authentic Mediterranean cuisine in Chicago. Visit us for delicious specialties!" />
        <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
        <meta name="twitter:site" content="@LittleLemon" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
