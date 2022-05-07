import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/antd.css';

import '../styles/globals.scss';
import { SWRConfig } from 'swr';
import { laggy } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="The Coffee" />
        <link rel="icon" href="/favicon.png" />
        <title>Quiz Test</title>
      </Head>
      <SWRConfig value={{ use: [laggy] }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
