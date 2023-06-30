'use client'

import { DatePicker } from './DatePicker'
import { MediaPicker } from './MediaPicker'

interface IEditMemoryHeaderProps {
  selectedDate: Date
  isPublic?: boolean
  isLoading?: boolean
  setSelectedDate: (date: Date) => void
  setCoverUrl: (string: string) => void
  setIsPublic: (isPublic: boolean) => void
  handleSaveChanges: () => void
}

export function EditMemoryHeader({
  selectedDate,
  setSelectedDate,
  setCoverUrl,
  isPublic,
  isLoading,
  setIsPublic,
  handleSaveChanges,
}: IEditMemoryHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <MediaPicker setUrl={setCoverUrl} />

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
    </div>
  )
}
