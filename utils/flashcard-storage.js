import React from 'react';
import { AsyncStorage } from 'react-native';
import uuid from 'uuid';

const FLASHCARD_STORAGE_KEY = 'FLASHCARD_STORAGE_KEY';

const uniqueId = () => {
  const idParts = [new Date().getTime(), uuid(), (Math.random() * 10000).toFixed(4)];
  return idParts.join('-');
}

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
export function getDeck({id}) {
  return getDecks()
    .then(decks => {
      const deck = decks.find(({id: deckId}) => deckId === id);
      if (deck) {
        return deck;
      }

      throw Error(`Could not find the requested deck with id=${id}`);
    })
    .catch(logErrorAndReturn(null));
}

/**
 * Returns a promise that will resolve with the id when the deck is added
 * @async
 * @return {Promise<String>}
 */
export function addDeck(title) {
  const id = uniqueId();
  return getDecks()
    .then(decks => {
      const newDecksData = decks.concat([{id, title}]);
      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecksData));
    })
    .then(() => id);
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

/**
 * Adds a card if the deck exists and resolves
 * @param {Object} - deckId and card object (card = {question, answer})
 * @async
 * @return {Promise}
 */
export function addCardToDeck({deckId, card}) {
  return getDecks()
    .then(decks => {
      const newDecksData = decks.map(deck => {
        if (deck.id === deckId) {
          const { cards } = deck;
          // add the card to this deck
          return {
            ...deck,
            cards: (cards || []).concat({
              ...card,
              id: uniqueId()
            })
          };
        }

        return {...deck};
      });

      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecksData));
    })
}

/**
 * Removes a card if the deck and card exist and resolves
 * @param {Object<{deckId: String, cardId: String}>} - deckId and cardId
 * @async
 * @return {Promise}
 */
export function removeCardFromDeck({deckId, cardId}) {
  return getDecks()
    .then(decks => {
      const newDecksData = decks.map(deck => {
        if (deck.id === deckId && Array.isArray(deck.cards)) {
          const { cards } = deck;

          return {
            ...deck,
            cards: deck.cards.filter(({id}) => cardId !== id)
          };
        }

        return {...deck};
      });

      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecksData));
    })
}
