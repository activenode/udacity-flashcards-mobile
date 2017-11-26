import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import {blackyGrey, greyWhite, androidGrey} from '../utils/colors';
import Button, { BTN_DANGER } from './Button';
import boxShadows from '../utils/box-shadows';
import iosElse from '../utils/ios-else';

export default function DeckList({
  screenProps: {
    decks = [],
    removeDeck,
    goToDeckDetails
  }
}) {
  return (
  <FlatList
    data={decks.map(deck => {
      return {key: deck.id, ...deck};
    })}
    renderItem={({item}) => {
      const { cards, title, id } = item;
      const cardsCount = Array.isArray(cards) ? cards.length : 0;

      return (
        <View style={styles.item}>
          <Text style={[styles.itemText, styles.itemHeadline]}>{title}</Text>
          <Text style={[styles.itemText, styles.itemCardsCount]}>
            {cardsCount} {cardsCount === 1 ? 'Card' : 'Cards'}
          </Text>
          <View style={styles.btnContainer}>
            <Button
              text='DELETE'
              type={BTN_DANGER}
              roundedBorders={{bottomLeft: true}}
              onPress={() => removeDeck(id)}
              />
            <Button
              flex={2.75}
              text='OPEN'
              roundedBorders={{bottomRight: true}}
              onPress={() => goToDeckDetails(id)} />
          </View>
        </View>
      )
    }} />);
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: iosElse(greyWhite, androidGrey),
    borderBottomWidth: iosElse(0, 3),
    borderColor: greyWhite,
    paddingTop: 20,
    paddingBottom: iosElse(0, 3),
    paddingLeft: iosElse(0, 5),
    paddingRight: iosElse(0, 5),
    margin: iosElse(15, 20),
    marginBottom: 0,
    borderRadius: iosElse(16, 0),
    alignItems: 'center',
    ...boxShadows
  },
  itemText: {
    color: blackyGrey
  },
  itemHeadline: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 8
  },
  itemCardsCount: {
    fontSize: 14,
    paddingBottom: 14
  },
  btnContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
});