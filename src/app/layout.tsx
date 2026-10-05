import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "THEATRON 2026",
  description: "Cinema, theatre and performing arts at Chennai Institute of Technology.",
}

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/theatron-intro-clean.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${geist.className} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
