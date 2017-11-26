import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import StartView from './components/StartView';
import StatusBar from './components/StatusBar';


export default class App extends React.Component {
  state = {

  }

  componentDidMount() {

  }

  onAddedDeck = () => {
    alert('foobar.onAddedDeck');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <StartView screenProps={{ onAddedDeck: this.onAddedDeck }} />
      </View>
    );
  }
}
