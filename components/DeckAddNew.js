import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import Button from './Button';
import { NavigationActions } from 'react-navigation';
import commonStyles from '../utils/common-styles';


class DeckAddNew extends React.Component {
  state = {
    deckTitle: ''
  }

  saveDeck = () => {
    const { screenProps: { goToDeckDetails, saveDeckAsync, onError }, navigation } = this.props;
    const { deckTitle } = this.state;

    // reset the state
    this.setState({deckTitle: ''});

    // first go back to overview
    navigation.dispatch(NavigationActions.back({ key: 'DeckAddNew' }));

    //then make sure to save it async and go to the result then!
    saveDeckAsync(deckTitle).then(goToDeckDetails).catch(onError);
  }

  render() {
    return (
      <View style={commonStyles.verticalCenteredPaddContainer}>
        <Text style={commonStyles.headline}>Enter the name of your new Deck:</Text>
        <TextInput
            style={commonStyles.input}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            value={this.state.deckTitle}
          />
        <View style={commonStyles.btnContainer}>
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