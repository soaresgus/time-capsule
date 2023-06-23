import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useEffect, useState } from 'react'
import iconSrc from '../assets/icon.png'
import { api } from '../src/lib/api'

import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale('pt-br')

interface IMemory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<IMemory[]>([])

  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  async function signOut() {
    SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom + 10, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Image source={iconSrc} alt="Logo" className="h-10 w-10" />

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            onPress={signOut}
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>

            <View className="space-y-4 px-8">
              {memory.coverUrl && (
                <Image
                  alt=""
                  className="aspect-video w-full rounded-lg"
                  source={{
                    uri: memory.coverUrl,
                  }}
                />
              )}

              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href="/memories/id" asChild>
                <TouchableOpacity
                  className="flex-row items-center gap-2"
                  activeOpacity={0.7}
                >
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
