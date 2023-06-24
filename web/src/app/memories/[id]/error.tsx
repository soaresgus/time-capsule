'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <Link
      href="/"
      className="group flex h-full w-full flex-1 flex-col items-center justify-center"
    >
      <p>A memória é privada ou ocorreu falha ao localizar a memória.</p>
      <span className="underline group-hover:text-gray-50">
        Voltar à timeline
      </span>
    </Link>
  )
}
