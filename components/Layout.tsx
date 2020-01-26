import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    children?: any;
    title?: string;
}

const Layout = ({children, title = 'This is the default title',}: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>{' '}
                |{' '}
                <Link href="/Products">
                    <a>Products</a>
                </Link>{' '}
                |{' '}
                <Link href="/Categories">
                    <a>Categories</a>
                </Link>
                |{' '}
                <Link href="/Statistics">
                    <a>Statistics</a>
                </Link>
                |{' '}
                <Link href="/Staff">
                    <a>Staff</a>
                </Link>
                |{' '}
                <Link href="/Documents">
                    <a>Documents</a>
                </Link>
            </nav>
        </header>
        {children}
        <footer>
            <hr/>
            <span>I'm here to stay (Footer)</span>
        </footer>
    </div>
)

export default Layout
