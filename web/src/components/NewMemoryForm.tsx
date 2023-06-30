'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DatePicker } from './DatePicker'
import { api } from '@/lib/api'
import { MediaPicker } from './MediaPicker'

const createMemoryFormSchema = z.object({
  isPublic: z.boolean().default(false),
  content: z.string().nonempty('O conteúdo é obrigatório'),
})

type createMemoryFormData = z.infer<typeof createMemoryFormSchema>

export function NewMemoryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [coverUrl, setCoverUrl] = useState<string | null>(null)

  const router = useRouter()

  const createMemoryForm = useForm<createMemoryFormData>({
    resolver: zodResolver(createMemoryFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createMemoryForm

  async function createMemory(data: createMemoryFormData) {
    setIsLoading(true)
    const token = cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl: coverUrl ?? '',
        content: data.content,
        isPublic: data.isPublic,
        createdAt: selectedDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    setIsLoading(false)
    router.prefetch('/')
    router.push('/')
  }

  return (
    <FormProvider {...createMemoryForm}>
      <form
        className="flex flex-1 flex-col gap-2"
        onSubmit={handleSubmit(createMemory)}
      >
        <div className="flex items-center gap-4">
          <MediaPicker setUrl={setCoverUrl} />

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              id="isPublic"
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
              {...register('isPublic')}
            />
            Tornar memória pública
          </label>

          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {coverUrl && (
          <img
            src={coverUrl}
            alt=""
            className="aspect-video h-auto w-full rounded-lg object-cover"
          />
        )}

        <textarea
          spellCheck="false"
          className="w-full flex-1 resize-none rounded border-2 border-gray-400 bg-transparent p-2 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:border-gray-300 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          {...register('content')}
        />
        {errors.content && (
          <span className="font-sm leading-tight text-red-500">
            {errors.content.message}
          </span>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600 disabled:bg-green-800"
        >
          salvar
        </button>
      </form>
    </FormProvider>
  )
}
