import React from 'react'
import Navbar from './Navbar'
import Footer from './footer'
import Head from 'next/head'

export const baseURL = `https://book-tree.vercel.app`
const imageURL = `${baseURL}/images/BrandLogo.png`

const description = 'booktree で本をシェア！'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title key="title">booktree</title>
                <meta key="og:title" property="og:title" content="booktree" />
                <meta key="twitter:title" name="twitter:title" content="booktree" />
                <meta key="og:image" property="og:image" content={imageURL} />
                <meta key="twitter:image" name="twitter:image" content={imageURL} />

                {/* <meta charset="utf-8" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#FEFEFE" />
                <link rel="apple-touch-icon" href="/image/logo192.png" />
                <link rel="manifest" href="/manifest.json" />

                <meta key="description" name="description" content={description} />
                <meta key="og:description" property="og:description" content={description} />

                <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
                <meta name="MobileOptimized" content="320" />
                <meta name="HandheldFriendly" content="True" />
                <meta name="google" content="notranslate" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={baseURL} />
                <meta property="og:locale" content="ja" />
                <meta property="og:site_name" content="booktree" />
                <meta property="og:image:alt" content="Banner" />
                <meta property="og:image:type" content="image/png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="BOOKTREE" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
