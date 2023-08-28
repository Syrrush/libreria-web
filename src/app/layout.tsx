import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
        <main className="px-4 grid min-h-screen m-auto grid-rows-[65px,1fr,65px] gap-4 max-w-screen-lg ">
          <nav className="flex items-center text-2xl">Holi nav</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">Holi footer</footer>
        </main>
      </body>
    </html>
  )
}
