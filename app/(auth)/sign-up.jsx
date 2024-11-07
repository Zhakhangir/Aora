import { Text, View, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormFiled from '../../components/FormFiled'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert('Error', 'Please fill in all fiel')
    }

    setSubmitting(true)

    try {
      const user = await createUser(form.email, form.password, form.username);
      // set it global state
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView keyboardDismissMode='on-drag'>
        <View className='w-full min-h-[85vh] justify-center items-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[155px] h-[35px]' />
          <Text className='text-2xl  text-white text-semibold mt-10 font-psemibold'> Sign up to Aora </Text>

          <FormFiled
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormFiled
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFiled
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles='w-full mt-7'
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary"> Sign In</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp