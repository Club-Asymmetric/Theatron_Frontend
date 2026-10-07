import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Sidebar from "@/components/sidebar"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: "THEATRON 2026",
  description: "Cinema, theatre and performing arts at Chennai Institute of Technology.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preload" href="/theatron-intro-clean.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${poppins.className} bg-black text-white antialiased selection:bg-[#8F1111] selection:text-white`}>
        <Sidebar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
