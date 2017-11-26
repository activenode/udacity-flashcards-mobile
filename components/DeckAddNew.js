import React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Button from './Button';
import boxShadows from '../utils/box-shadows';
import iosElse from '../utils/ios-else';
import { NavigationActions } from 'react-navigation';


class DeckAddNew extends React.Component {
  state = {
    deckTitle: ''
  }

  saveDeck = () => {
    const { screenProps: { goToDeckDetails }, navigation } = this.props;
    navigation.navigate('DeckList');
    goToDeckDetails('hey');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Enter the name of your new Deck:</Text>
        <TextInput
            style={styles.input}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            value={this.state.deckTitle}
          />
        <View style={styles.btnContainer}>
          {!!this.state.deckTitle && <Button
              text='Save'
              onPress={this.saveDeck}
              roundedBorders={{
                topLeft: true, topRight: true, bottomRight: true, bottomLeft: true
              }}
              />}
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center'
  },
  btnContainer: {
    height: 52,
    marginTop: 15
  },
  headline: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center'
  },
  input: {
    marginTop: 20,
    borderRadius: iosElse(16, 0),
    borderWidth: iosElse(2, 0),
    borderColor: 'blue',
    paddingLeft: 20,
    paddingRight: 20,
    height: 52,
    textAlign: 'center',
    fontSize: iosElse(14, 16),
    ...boxShadows
  }
});

export default DeckAddNew;