import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DeckList from './DeckList';
import DeckAddNew from './DeckAddNew';

const MainTabView = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks'
    }
  },
  DeckAddNew: {
    screen: DeckAddNew,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
});

export default function StartView(props={}) {
  return (<KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    <MainTabView {...props} />
  </KeyboardAvoidingView>);
}