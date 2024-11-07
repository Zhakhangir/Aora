import { FlatList, Text, View, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import { VideoCard } from '../../components/VideoCard'

const Home = () => {
  const { data: posts, fetchData: refetchData } = useAppwrite(getAllPosts)
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetchData()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyboardDismissMode='on-drag'
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'white'} />}

        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        ListEmptyComponent={() =>
          <EmptyState
            title='Empty List'
            subtitle='Please add video'
          />
        }

        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'> Welcome Back </Text>
                <Text className='text-2xl text-white font-psemibold'> JMastery </Text>
              </View>

              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>

            <SearchInput />

            <View className='w-fill flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular'>  Latest Vieos </Text>
            </View>

            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Home