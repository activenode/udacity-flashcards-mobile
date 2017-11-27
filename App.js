import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MainView from './components/MainView';
import StatusBar from './components/StatusBar';


const mockState = {
  decks: [
    {
      id: 'some-id',
      title: 'Deck Title 1',
      cards: undefined
    },
    {
      id: 'some-id-2',
      title: 'Deck Title 2',
      cards: null
    },
    {
      id: 'some-id-3',
      title: 'Deck Title 3',
      cards: []
    },
    {
      id: 'some-id-4',
      title: 'Deck Title 4',
      cards: [{
        id: 'some-card-id-1',
        question: 'Front of Card',
        answer: 'Back of Card'
      }]
    }
  ]
}

export default class App extends React.Component {
  state = {
    ...mockState
  }

  saveDeckAsync = (title) => {
    const uuid = Math.random() * 1000000 + '___';
    return new Promise((resolve, reject) => {
      this.setState(state => {
        return {
          ...state,
          decks: state.decks.concat([ {id: uuid, title} ])
        }
      });

      resolve(uuid);
    });
  }

  removeDeck = deckId => {
    Alert.alert(
      'Really?',
      'This will delete the deck with all its cards',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes, delete it!', onPress: () => this._removeDeck(deckId)}
      ],
      { cancelable: false }
    )
  }

  _removeDeck = deckId => {
    this.setState(state => {
      return {
        decks: state.decks.filter(({id}) => deckId !== id)
      }
    });
  }

  render() {
    const {
      saveDeckAsync,
      removeDeck,
      state: { decks }
    } = this;

    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <MainView screenProps={{
           saveDeckAsync,
           removeDeck,
           decks
        }} />
      </View>
    );
  }
}
