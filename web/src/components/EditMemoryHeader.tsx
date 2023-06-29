'use client'

import { Camera } from 'lucide-react'
import { DatePicker } from './DatePicker'
import { ChangeEvent } from 'react'

interface IEditMemoryHeaderProps {
  selectedDate: Date
  isPublic?: boolean
  isLoading?: boolean
  setSelectedDate: (date: Date) => void
  setMedia: (file: File) => void
  setIsPublic: (isPublic: boolean) => void
  handleSaveChanges: () => void
}

export function EditMemoryHeader({
  selectedDate,
  setSelectedDate,
  setMedia,
  isPublic,
  isLoading,
  setIsPublic,
  handleSaveChanges,
}: IEditMemoryHeaderProps) {
  function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
    setMedia(event.target.files![0])
  }

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="media"
        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
      >
        <Camera className="h-4 w-4" />
        Editar mídia
      </label>
      <label
        htmlFor="isPublic"
        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
      >
        <input
          checked={isPublic}
          onChange={(event) => setIsPublic(event.target.checked)}
          type="checkbox"
          id="isPublic"
          className="h-4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
        />
        Tornar memória pública
      </label>

      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <button
        disabled={isLoading}
        type="button"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
        onClick={handleSaveChanges}
      >
        SALVAR
      </button>

      <input
        id="media"
        type="file"
        className="invisible h-0 w-0"
        accept="image/*"
        onChange={handleChangeFile}
      />
    </div>
  )
}
