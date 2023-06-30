'use client'

import { Camera, Check } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { useRef, useState } from 'react'

interface MediaPickerProps {
  setUrl: (url: string) => void
}

export function MediaPicker({ setUrl }: MediaPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <div className="flex gap-2 rounded-lg bg-gray-700 p-2">
            <input
              type="text"
              ref={inputRef}
              className="border-1 rounded-lg border-gray-400 bg-transparent p-1 placeholder:text-gray-300 focus:border-gray-400 focus:ring-0"
              placeholder="Digite a URL da imagem"
            />
            <button
              type="button"
              className="rounded bg-purple-500 p-2 hover:bg-purple-600"
              onClick={() => {
                setUrl(inputRef.current?.value!)
                setOpen(false)
              }}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
