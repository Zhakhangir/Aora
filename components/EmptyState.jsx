import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty} className='w-[240px] h-[215px]' resizeMode='cotain' />
            <Text className='text-xl text-white font-psemibold mt-2 text-center'> {title} </Text>
            <Text className='font-psemibold text-sm text-gray-100 text-center'> {subtitle} </Text>
            <CustomButton title='Create video' handlePress={() => { router.push('/create') }} containerStyles={'w-full my-5'} />
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({})