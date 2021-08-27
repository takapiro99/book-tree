import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="container">{children}</main>
        </>
    )
}
