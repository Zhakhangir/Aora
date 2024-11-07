import CustomButton from '../components/CustomButton'
import React from 'react'
import images from '../constants/images'
import { ScrollView, Image, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'

const Index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100 %' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
          <View className='relative mt-5'></View>
          <Text className='text-3xl font-bold text-center text-white'>
            Discover Endless Possibilities with {'  '}
            <Text className='text-secondary-200'>  Aora </Text>
          </Text>

          <Image
            source={images.path}
            className='w-[136px] h-15px absolute-bottom-2 -right-8'
            resizeMode='contain' />
          <Text
            className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meet innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-7' />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}
export default Index