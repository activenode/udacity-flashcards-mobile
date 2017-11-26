import React from 'react';
import { View, StatusBar as NativeStatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default function StatusBar() {
  return (
    <View style={styles.container}>
      <NativeStatusBar translucent backgroundColor='red' barStyle='light-content' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: Constants.statusBarHeight
  }
});