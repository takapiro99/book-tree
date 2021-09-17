// pages/404.js
import Head from 'next/head'
import { createTitle } from '../lib/util'

export default function Custom404() {
    return (
        <div>
            <Head>{createTitle('Not found')}</Head>
            <h1>404 - Page Not Found...</h1>
        </div>
    )
}
