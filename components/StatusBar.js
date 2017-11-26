import React from 'react';
import { View, StatusBar as NativeStatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import {statusBarBg} from '../utils/colors';


export default function StatusBar() {
  return (
    <View style={styles.container}>
      <NativeStatusBar translucent backgroundColor={statusBarBg} barStyle='light-content' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: statusBarBg,
    height: Constants.statusBarHeight
  }
});