import './globals.css'
import React from 'react'

/**
 * Root layout: wraps all locales. Note: actual page content is in /app/[locale]/...
 */
export const metadata = {
    title: 'MediTech Global',
    description: 'Advanced medical devices. Global care.'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
