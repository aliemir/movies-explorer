import React from 'react'
import Layout from '../components/Layout'
import { AppProps } from 'next/app'
import Head from 'next/head'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
