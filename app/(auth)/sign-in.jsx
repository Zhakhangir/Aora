import { Text, View, Image, Alert } from 'react-native'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { images } from '../../constants'
import FormFiled from '../../components/FormFiled'
import CustomButton from '../../components/CustomButton'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fiel')
      return
    }

    setSubmitting(true)

    try {
      await signIn(form.email, form.password);
      // set it global state
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView keyboardDismissMode='on-drag'>
        <View className='w-full min-h-[85vh] justify-center items-center px-4 my-6'>

          <Image source={images.logo} resizeMode='contain' className='w-[155px] h-[35px]' />
          <Text className='text-2xl  text-white text-semibold mt-10 font-psemibold'> Log in to Aora  </Text>

          <FormFiled
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType='email-address'
          />

          <FormFiled
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles='w-full mt-7'
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className='text-lg text-gray-100 font-pregular'>Don't have account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary"> Sign Up</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn