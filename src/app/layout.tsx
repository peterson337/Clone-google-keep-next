import './globals.css'
import { Inter } from 'next/font/google'
import { AnotacoesProvider } from './Context/store'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Clone do google keep',
  description: 'Clone do google keep feito com next, tailwind e contextapi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnotacoesProvider>
        {children}

        </AnotacoesProvider>
              </body>
    </html>
  )
}
