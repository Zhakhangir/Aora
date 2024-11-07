import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { icons, images } from '@/constants'

const FormFiled = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    function eyeComponent(title) {
        return (title === 'Password' ? (<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
        </TouchableOpacity>) : null)
    }
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title} </Text>
            <View
                className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus-border-secondary items-center flex-row'
            >
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderText='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />

                {eyeComponent(title)}
            </View>
        </View >
    )
}

export default FormFiled

const styles = StyleSheet.create({})