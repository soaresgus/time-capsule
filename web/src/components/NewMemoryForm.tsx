'use client'

import { Camera } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MediaPicker } from './MediaPicker'
import { FormProvider, useForm } from 'react-hook-form'
import cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const createMemoryFormSchema = z.object({
  media: z
    .instanceof(FileList)
    .transform((files) => files.item(0)!)
    .optional(),
  isPublic: z.boolean().default(false),
  content: z.string().nonempty('O conteúdo é obrigatório'),
})

type createMemoryFormData = z.infer<typeof createMemoryFormSchema>

export function NewMemoryForm() {
  const [isLoading, setIsLoading] = useState(false)

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
    let coverUrl = ''
    const token = cookie.get('token')

    if (data.media) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', data.media)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      coverUrl = uploadResponse.data
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content: data.content,
        isPubic: data.isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    setIsLoading(false)
    router.push('/')
  }

  return (
    <FormProvider {...createMemoryForm}>
      <form
        className="flex flex-1 flex-col gap-2"
        onSubmit={handleSubmit(createMemory)}
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>

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
        </div>

        <MediaPicker name="media" />

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
