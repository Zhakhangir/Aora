import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../../constants'
import { createVideo } from '../../lib/appwrite'

import { Video, ResizeMode } from 'expo-av'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import FormFiled from '../../components/FormFiled'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const submit = async () => {
    if (!form.title && !form.prompt && !form.thumbnail && !form.video) {
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true)

    try {
      await createVideo({
        ...form, userId: user.$id
      })
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
    }

    setUploading(false)
  }

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        className='px-4 py-6'
        keyboardDismissMode='on-drag'
        contentOffset={{ y: 200 }}
      >
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
        <FormFiled
          title='Video Title'
          value={form.title}
          placeholder='Give your a catch file'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10' />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 text-pmedium'> Upload Video </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                resizeMode={ResizeMode.CONTAIN}
                source={{ uri: form.video.uri }}
                style={{
                  width: '100%',
                  height: 256,
                  borderRadius: 35
                }}
              />
            ) :
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image source={icons.upload} className='w-1/2 h-1/2' />
                </View>
              </View>
            }
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 text-pmedium'> Thumbnail Image </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode='contain'
              />) :
              <View
                className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row'>
                <Image source={icons.upload} className='w-5 h-5' />
                <Text className='text-sm text-gray-100 frot-pmedium'> Choose file </Text>
              </View>
            }
          </TouchableOpacity>
        </View>

        <FormFiled
          title='AI prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7' />
        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create