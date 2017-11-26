import React from 'react';
import StartView from './StartView';
import DeckDetails from './DeckDetails';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Test = () => <View><Text>I am a Mess</Text></View>;

const MainView = StackNavigator({
  Home: {
    screen: StartView,
    navigationOptions: {
      header: null
    },
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'red'
      }
    }
  }
});

export default MainView;