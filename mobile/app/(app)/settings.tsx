import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSession } from '../../components/ctx'

export default function Settings() {
  const {signOut} = useSession()
  return (
    <View>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  )
}

const styles = StyleSheet.create({})