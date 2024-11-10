import React, { useEffect } from 'react'

import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoCard } from '../../components/VideoCard'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'

import { searchPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, fetchData: refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  console.log(query, posts)
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyboardDismissMode='on-drag'
        keyExtractor={(item) => item.id}

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
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'> Search Results </Text>
            <Text className='text-2xl text-white font-psemibold'> {query} </Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Search