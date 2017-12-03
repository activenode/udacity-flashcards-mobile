import React from 'react';
import { Text, View } from 'react-native';
import Button from './Button';
import commonStyles from '../utils/common-styles';


export default function DeckListNoResults({ onTapNewDeck }) {
  return (
    <View style={[commonStyles.verticalCenteredPaddContainer]}>
      <Text style={commonStyles.headline3}>You don't have any decks added by now!</Text>
      <View style={commonStyles.btnContainer}>
        <Button text='Add a Deck now' onPress={onTapNewDeck} />
      </View>
    </View>
  );
}