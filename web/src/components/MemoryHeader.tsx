'use client'

import { Pencil, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface IMemoryHeaderProps {
  memoryId: string
}

export function MemoryHeader({ memoryId }: IMemoryHeaderProps) {
  const [copyUrlFeedbackIsVisible, setCopyUrlFeedbackIsVisible] =
    useState(false)

  function copyUrlToClipboard() {
    navigator.clipboard.writeText(document.location.href)
    setCopyUrlFeedbackIsVisible(true)

    setTimeout(() => {
      setCopyUrlFeedbackIsVisible(false)
    }, 2000)
  }

  return (
    <div className="flex items-start gap-4">
      <Link
        href={`/memories/${memoryId}/edit`}
        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
      >
        <Pencil className="h-4 w-4" />
        Editar memória
      </Link>

      <div className="relative flex flex-col items-center">
        <button
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          onClick={copyUrlToClipboard}
        >
          <LinkIcon className="h-4 w-4" />
          Copiar URL
        </button>

        {copyUrlFeedbackIsVisible && (
          <div className="absolute z-50 mt-6 flex flex-col items-center text-zinc-50">
            <div className="h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-purple-500" />
            <span className="rounded-lg bg-purple-500 px-2 py-1">Copiado!</span>
          </div>
        )}
      </div>
    </div>
  )
}
