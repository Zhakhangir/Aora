import { FlatList, ImageBackground, Text, Image, TouchableOpacity, View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { getVimeoLinks } from '../lib/videoServices'

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },

    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}>
            {play ? (
                <Video
                    source={{
                        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    style={{
                        height: 288,
                        width: 208,
                        marginTop: 12,
                        marginBottom: 20,
                        borderRadius: 35,
                        overflow: 'hidden'
                    }} // use css style tailwind not working with <Video>
                    useNativeControls
                    shouldPlay
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) setPlay(false)
                    }}
                />
            ) :
                (<TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMethod='cover'
                    />

                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain' />
                </TouchableOpacity>)
            }
        </Animatable.View >
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0])

    const viewableItemChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList
            horizontal
            data={posts}
            keyExtractor={(item) => item.$id}
            onViewableItemsChanged={viewableItemChanged}
            renderItem={({ item }) => {
                return <TrendingItem activeItem={activeItem} item={item} />
            }
            }
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170 }}
        />
    )
}

export default Trending