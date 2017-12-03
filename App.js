import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MainView from './components/MainView';
import StatusBar from './components/StatusBar';

function getRandomId() {
  return Math.random() * 1000000 + '___' + Date.now();
}

export default class App extends React.Component {
  state = { decks: [] }

  saveDeckAsync = (title) => {
    const id = getRandomId();
    return new Promise((resolve, reject) => {
      this.setState(state => {
        return {
          decks: state.decks.concat([ {id, title} ])
        }
      });

      resolve(id);
    });
  }

  saveCardAsync = ({deckId, question, answer}) => {
    const id = getRandomId();

    return new Promise((resolve, reject) => {
      // first: get the deck from the current state
      const deck = this.state.decks.find(({id}) => id === deckId);

      if (!deck) {
        reject('Could not find the deck you are trying to add a card to');
      }

      const newCardList = (deck.cards || []).concat([{
        id,
        question,
        answer
      }]);

      this.setState(state => {
        return {
          decks: state.decks.map(deck => {
            if (deck.id === deckId) {
              return {
                ...deck,
                cards: newCardList
              };
            }

            return { ...deck };
          })
        }
      });

      resolve(id);
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

  onError(error) {
    alert(`An error occured ${String(error)}`);
  }

  render() {
    const {
      saveDeckAsync,
      saveCardAsync,
      removeDeck,
      onError,
      state: { decks }
    } = this;

    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <MainView screenProps={{
           saveDeckAsync,
           saveCardAsync,
           removeDeck,
           onError,
           decks
        }} />
      </View>
    );
  }
}
