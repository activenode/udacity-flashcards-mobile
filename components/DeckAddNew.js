import React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

export default function DeckAddNew({screenProps}) {
  state = {
    deckTitle: ''
  }
  return (
  <View style={styles.container}>
    <Text style={styles.headline}>Enter the name of your new Deck:</Text>
    <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({deckTitle})}
        value={this.state.deckTitle}
      />
    <TouchableOpacity onPress={screenProps.onAddedDeck}>
      <Text>Save</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 100,
    justifyContent: 'center'
  },
  headline: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center'
  },
  input: {
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'blue',
    height: 50,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.3
  }
})