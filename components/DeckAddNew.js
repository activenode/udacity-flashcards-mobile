import React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Button from './Button';
import { NavigationActions } from 'react-navigation';
import styles from '../utils/common-styles';


class DeckAddNew extends React.Component {
  state = {
    deckTitle: ''
  }

  saveDeck = () => {
    const { screenProps: { goToDeckDetails, saveDeckAsync }, navigation } = this.props;
    const { deckTitle } = this.state;

    // reset the state
    this.setState({deckTitle: ''});

    // first go back to overview
    navigation.dispatch(NavigationActions.back({ key: 'DeckAddNew' }));

    //then make sure to save it async and go to the result then!
    saveDeckAsync(deckTitle).then(goToDeckDetails);
  }

  render() {
    return (
      <View style={styles.verticalCenteredPaddContainer}>
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

export default DeckAddNew;