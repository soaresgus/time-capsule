import { api } from '@/lib/api'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { MemoryHeader } from '@/components/MemoryHeader'
import { getUser } from '@/lib/auth'
import Image from 'next/image'
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

export default async function Memory({ params: { id } }: IPageParams) {
  const token = cookies().get('token')?.value
  const { sub: userId } = getUser()

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: IMemory = response.data

  return (
    <div className="flex flex-col space-y-4 p-16">
      <time className="-ml-16 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <Link
        href="/"
        prefetch
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      {memory.userId === userId && <MemoryHeader memoryId={memory.id} />}

      {memory.coverUrl && (
        <Image
          src={memory.coverUrl}
          width={592}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </div>
  )
}
