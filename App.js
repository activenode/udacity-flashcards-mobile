import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MainView from './components/MainView';
import StatusBar from './components/StatusBar';
import * as FlashCardStorage from './utils/flashcard-storage';


export default class App extends React.Component {
  state = { decks: [] }

  loadDecksFromStorage = () => {
    return FlashCardStorage.getDecks()
      .then(decks => this.setState({ decks }))
      .catch(this.onError);
  }

  componentDidMount() {
    this.loadDecksFromStorage();
  }

  saveDeckAsync = (title) => {
    return FlashCardStorage.addDeck(title)
      .then(id => {
        return new Promise(resolve => {
          this.setState(state => {
            return {
              decks: state.decks.concat([ {id, title} ])
            }
          });
    
          resolve(id);
        });
      })
      .catch(this.onError);
  }

  saveCardAsync = ({deckId, question, answer}) => {
    return FlashCardStorage
      .addCardToDeck({deckId, card: { question, answer }})
      .then(id => {
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
      })
      .catch(this.onError);
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
    FlashCardStorage.removeDeck({id: deckId})
      .then(() => {
        this.setState(state => {
          return {
            decks: state.decks.filter(({id}) => deckId !== id)
          }
        });
      })
      .catch(this.onError);
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
