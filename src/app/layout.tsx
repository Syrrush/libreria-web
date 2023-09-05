import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto_Slab, EB_Garamond } from 'next/font/google'
import Footer from './footer'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Slab({subsets: ["latin"], weight:"600"})
const garamond = EB_Garamond({subsets:['latin'], weight:"500"})
export const metadata: Metadata = {
  title: '📚 Read Hub 📚',
  description: 'Discover a new way to manage your reading experience with our platform. Keep track of books, create reading lists, and stay engaged with your literary adventures.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body >
        <main className="px-4 grid min-h-screen m-auto grid-rows-[65px,1fr,65px] gap-4 max-w-screen-lg">
          <nav className="flex items-center text-2xl">
            <h1 className={roboto.className}>Read Hub</h1></nav>
          <section className={garamond.className}>{children}</section>
          <footer><Footer/></footer>
        </main>
      </body>
    </html>
  )
}
