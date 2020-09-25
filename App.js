import React, { useState, useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import AppNavigator from './navigation/AppNavigator'
import { ContextProvider } from './Context'

import { useFonts } from 'expo-font'
import { Aldrich_400Regular } from '@expo-google-fonts/aldrich'
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono'

export default function App(props) {
  let [fontsLoaded] = useFonts({
    Aldrich_400Regular,
    NovaMono_400Regular,
    fonticons: require('./assets/fonts/fonticons.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <ContextProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      </ContextProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
