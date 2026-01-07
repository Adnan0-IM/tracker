import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSession } from '../../components/ctx'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const {signOut} = useSession()
  return (
    <SafeAreaView>
      <View className='flex items-center justify-center pt-64'>

      <Text onPress={() => signOut()}>Sign Out</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})