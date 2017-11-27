import React from 'react';
import StartView from './StartView';
import DeckDetails from './DeckDetails';
import { StackNavigator } from 'react-navigation';
import { statusBarBg } from '../utils/colors';
import {Text, View} from 'react-native';


const MainView = StackNavigator({
  Home: {
    screen: StartView,
    navigationOptions: {
      header: null
    },
  },
  DeckDetails: {
    screen: DeckDetails
  },
  DeckQuiz: {
    screen: () => <View><Text> i bims quiz </Text></View>
  },
  DeckAddCard: {
    screen: () => <View><Text> i bims addcard </Text></View>
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: statusBarBg
    }
  }
});

export default MainView;