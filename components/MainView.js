import React from 'react';
import StartView from './StartView';
import DeckDetails from './DeckDetails';
import DeckAddCard from './DeckAddCard';
import { StackNavigator } from 'react-navigation';
import { statusBarBg } from '../utils/colors';
import { Text, View } from 'react-native';
import DeckQuiz from './DeckQuiz';


const MainView = StackNavigator({
  Home: {
    screen: StartView,
    navigationOptions: {
      header: null
    }
  },
  DeckDetails: {
    screen: DeckDetails
  },
  DeckQuiz: {
    screen: DeckQuiz
  },
  DeckAddCard: {
    screen: DeckAddCard
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