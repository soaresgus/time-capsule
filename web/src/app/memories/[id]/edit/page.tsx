'use client'

import { api } from '@/lib/api'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import cookie from 'js-cookie'
import decode from 'jwt-decode'

import { User } from '@/types/user'
import { useState } from 'react'
import Error from '../error'
import { EditMemoryHeader } from '@/components/EditMemoryHeader'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

dayjs.locale('pt-br')

interface IPageParams {
  params: { id: string }
}

interface IMemory {
  coverUrl: string
  id: string
  content: string
  createdAt: string
  userId: string
  isPublic: boolean
}

export default function Memory({ params: { id } }: IPageParams) {
  const token = cookie.get('token')
  const { sub: userId } = decode(token!) as User

  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState<boolean | null>(null)
  const [content, setContent] = useState<string | null>(null)

  const [editIsLoading, setEditIsLoading] = useState(false)

  const {
    data: memory,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [`memory-${id}`],
    queryFn: () => getMemory(),
  })

  async function handleSaveChanges() {
    setEditIsLoading(true)

    const contentData = content ?? memory?.content
    const coverUrlData = coverUrl ?? memory?.coverUrl
    const createdAtData = selectedDate ?? memory?.createdAt
    const isPublicData = isPublic ?? memory?.isPublic

    await api.put(
      `/memories/${id}`,
      {
        content: contentData,
        coverUrl: coverUrlData,
        isPublic: isPublicData,
        createdAt: createdAtData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    setEditIsLoading(false)
    router.prefetch(`/memories/${id}`)
    router.push(`/memories/${id}`)
  }

  async function getMemory() {
    const request = await api.get(`/memories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const memory: IMemory = await request.data

    return memory
  }

  if (isError) {
    return <Error />
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <p className="w-[360px] text-center leading-relaxed">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col space-y-4 p-16">
      <time className="-ml-16 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <Link
        href={`/memories/${id}`}
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à memória
      </Link>

      {memory.userId === userId && (
        <EditMemoryHeader
          selectedDate={selectedDate ?? dayjs(memory.createdAt).toDate()}
          setSelectedDate={setSelectedDate}
          setCoverUrl={setCoverUrl}
          setIsPublic={setIsPublic}
          isPublic={isPublic ?? memory.isPublic}
          isLoading={editIsLoading}
          handleSaveChanges={handleSaveChanges}
        />
      )}

      {!coverUrl && memory.coverUrl && (
        <Image
          src={memory.coverUrl}
          width={592}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {coverUrl && (
        <Image
          src={coverUrl}
          width={592}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      <textarea
        spellCheck="false"
        className="h-full w-full flex-1 resize-none rounded border-2 border-gray-400 bg-transparent p-2 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:border-gray-300 focus:ring-0"
        value={content ?? memory.content}
        onChange={(event) => setContent(event.target.value)}
      />
    </div>
  )
}
