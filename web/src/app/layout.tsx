import './globals.css'
import { ReactNode } from 'react'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { Blur } from '@/components/Blur'
import { Stripes } from '@/components/Stripes'
import { Account } from '@/components/Account'
import { LinkButton } from '@/components/Button'

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
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative grid grid-flow-row items-start overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <Blur />

            <Stripes />

            <Account />

            <div className="space-y-5">
              <div className="max-w-[420px] space-y-1">
                <h1 className=" text-[40px] font-bold leading-tight text-gray-50">
                  Sua cápsula do tempo
                </h1>
                <p
                  className="text-lg leading-relaxed
            "
                >
                  Colecione momentos marcantes da sua jornada e compartilhe (se
                  quiser) com o mundo!
                </p>
              </div>

              <LinkButton href="/" title="cadastrar lembrança" />
            </div>
          </div>

          {children}
        </main>
      </body>
    </html>
  )
}
