import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import uuid from 'uuid';

const FLASHCARD_STORAGE_KEY = 'FLASHCARD_STORAGE_KEY';

const logErrorAndReturn = returnValue => {
  return error => {
    console.warn(error);

    return returnValue;
  };
};

/**
 * Returns a promise that will return an array of decks
 * @async
 * @return {Promise<Array>}
 */
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      console.log('all decks', data);
      return Array.isArray(data) ? data : [];
    })
    // we want to avoid the app breaking.
    // so if something fails we will return an empty array
    .catch(logErrorAndReturn([]));
}

/**
 * Returns a promise that will return the requested deck
 * @async
 * @return {Promise<Object|Array>}
 */
export function getDeck({id, onNotFoundReturnDecks}) {
  return getDecks()
    .then(decks => {
      const deck = decks.find(({id: deckId}) => deckId === id);
      if (deck) {
        return deck;
      }

      if (!onNotFoundReturnDecks) {
        throw Error(`Could not find the requested deck with id=${id}`);
      }

      return decks;
    })
    .catch(logErrorAndReturn(null));
}

/**
 * Returns a promise that will resolve when the deck is added
 * @async
 * @return {Promise}
 */
export function addDeck(title) {
  const id = uuid();
  return getDeck({id, onNotFoundReturnDecks: true})
    .then(decks => {
      if (!Array.isArray(decks)) {
        // this means that the id is already in place! try again!
        return addDeck(title);
      }

      const newDecksData = decks.concat([{id, title}]);
      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecksData));
    });
}

/**
 * Returns a promise that will resolve when the deck is removed
 * @async
 * @return {Promise}
 */
export function removeDeck({id}) {
  return getDecks()
    .then(decks => {
      const newDecksData = decks.filter(({id: deckId}) => deckId !== id);
      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecksData));
    })
}

export function removeAllDecks() {
  return AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}
