import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import data from '../data/data.json';
import '../styles/globals.css'; // Make sure this path is correct

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider colorSchemes={data.colorSchemes}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
