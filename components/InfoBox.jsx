import React from "react";
import { View, Text } from "react-native";


export const InfoBox = ({ title, subtitle, containerStyles, textStyles }) => {
    return (
        <View className={containerStyles}>
            <Text className={`text-white text-center font-psemibold  ${textStyles}`}> {title} </Text>
            <Text className={`text-sm text-gray-100 text-center font-pregular`}> {subtitle} </Text>
        </View >
    )
}