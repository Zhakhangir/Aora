import { FlatList, Text, View, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import { VideoCard } from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'


const Saved = () => {
  const { data: posts, fetchData: refetchData } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useGlobalContext()
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
        keyExtractor={(item) => item.$id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'white'} />
        }

        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <Text className='text-2xl text-white font-psemibold'>Saved Videos</Text>
            </View>

            <SearchInput placeholder='Search your saved videos' />
          </View>
        )}

        ListEmptyComponent={() =>
          <EmptyState
            title='Empty List'
            subtitle='Please add video'
          />
        }

        renderItem={({ item }) => (<VideoCard video={item} />)}
      />
    </SafeAreaView>
  )
}

export default Saved