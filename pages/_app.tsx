import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import data from '../data/data.json';
import  Head  from 'next/head';
import '../styles/globals.css'; // Make sure this path is correct

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Add viewport meta here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider colorSchemes={data.colorSchemes}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>

  );
}
