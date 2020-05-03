import React from 'react'
import Layout from '../components/Layout'
import { AppProps } from 'next/app'
import Head from 'next/head'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
