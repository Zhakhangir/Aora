import React, { useEffect, useContext } from 'react'

import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoCard } from '../../components/VideoCard'
import { InfoBox } from '../../components/InfoBox'

import EmptyState from '../../components/EmptyState'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getUserPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import { icons } from '../../constants'
import { signOut } from '../../lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {
  const { setIsLoggedIn, user, setUser } = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  const logout = async () => {
    await signOut()

    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyboardDismissMode='on-drag'
        keyExtractor={(item) => item.$id}

        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        ListEmptyComponent={() =>
          <EmptyState
            title='Empty List'
            subtitle='No video found for this search query'
          />
        }

        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full mb-10 items-end'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyle='text-lg' />

            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyle='text-xl' />

              <InfoBox
                title='5K'
                subtitle='Followers'
                titleStyle='text-xl' />
            </View>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Profile