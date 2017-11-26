import React from 'react';
import { FlatList } from 'react-native';
import { Text, View } from 'react-native';

export default function DeckList({decks = []}) {
  return (
  <FlatList
    data={[{key: 'a'}, {key: 'b'}]}
    renderItem={({item}) => <Text>{item.key}</Text>}
  />);
}