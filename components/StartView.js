import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DeckList from './DeckList';
import DeckAddNew from './DeckAddNew';
import { coolAction , greyWhite} from '../utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MainTabView = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-list' size={30} color={tintColor} />
    }
  },
  DeckAddNew: {
    screen: DeckAddNew,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='plus' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? coolAction : 'white',
    indicatorStyle: {
      borderBottomColor: '#ffffff',
      borderBottomWidth: 2,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : coolAction,
      shadowColor: 'rgba(0, 0, 0, 0.44)',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

export default function StartView(props={}) {
  return (<KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    <MainTabView {...props} />
  </KeyboardAvoidingView>);
}