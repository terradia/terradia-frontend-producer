import React from 'react'
import Layout from "../components/Layout/Layout";

export default ({ Component, pageProps }: any) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
)