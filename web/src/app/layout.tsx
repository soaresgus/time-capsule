import './globals.css'
import { ReactNode } from 'react'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { Blur } from '@/components/Blur'
import { Stripes } from '@/components/Stripes'
import { Account } from '@/components/Account'
import { Hero } from '@/components/Hero'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'Cápsula do Tempo',
  description: 'Recorde suas memórias',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2 max-lg:grid-cols-1">
          <div className="relative grid grid-flow-row items-start overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 max-lg:justify-center max-lg:gap-4 max-lg:px-4">
            <Blur />

            <Stripes />

            <Account />

            <Hero />
          </div>

          <div className="flex h-screen flex-col overflow-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
