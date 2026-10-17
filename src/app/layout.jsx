import { Poppins, Geist, Cinzel } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Sidebar from "@/components/sidebar"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

// Roman display capitals for headings, matching the Nocturne intro's baroque mask
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
})

export const metadata = {
  title: "THEATRON 2026",
  description: "Cinema, theatre and performing arts at Chennai Institute of Technology.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${geist.variable} ${cinzel.variable}`}>
      <body className={`${poppins.className} bg-ink-950 text-white antialiased selection:bg-crimson-600 selection:text-white`}>
        <Sidebar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
