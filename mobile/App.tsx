import { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import * as SplashScreen from 'expo-splash-screen'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import logo from './assets/icon.png'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes)

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const onLayoutRootView = useCallback(async () => {
    if (hasLoadedFonts) {
      await SplashScreen.hideAsync()
    }
  }, [hasLoadedFonts])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      onLayout={onLayoutRootView}
      className="relative flex-1 items-center bg-gray-900 px-8"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <Image source={logo} alt="Logo" className="h-20 w-20" />

        <View className=" space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black">
            cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
