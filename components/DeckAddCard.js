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

class DeckAddCard extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: `Add a Card to ${navigation.state.params.deckTitle}` };
  }

  state = {
    cardQuestion: '',
    cardAnswer: ''
  }

  saveCard = () => {
    const { screenProps: { saveCardAsync, onError }, navigation } = this.props;
    const { cardQuestion, cardAnswer } = this.state;
    const { deckId } = navigation.state.params;

    // reset the state
    this.setState({cardQuestion: '', cardAnswer: ''});

    //then make sure to save it async and go to detail view again
    saveCardAsync({deckId, question: cardQuestion, answer: cardAnswer}).then(() => {
      navigation.goBack()
    }).catch(onError);
  }

  render() {
    return (
      <View style={commonStyles.verticalCenteredPaddContainer}>
        <Text style={commonStyles.headline2}>Question of the Card:</Text>
        <TextInput
            style={commonStyles.input}
            onChangeText={cardQuestion => this.setState({cardQuestion})}
            value={this.state.cardQuestion}
            placeholder='Appears on the front of your card...'
          />
        <Text style={[commonStyles.headline2, {marginTop: 20}]}>The answer:</Text>
        <TextInput
          style={commonStyles.input}
          onChangeText={cardAnswer => this.setState({cardAnswer})}
          value={this.state.cardAnswer}
          placeholder='The backside of the card...'
        />

        <View style={[commonStyles.btnContainer, {marginTop: 40}]}>
          {!!(this.state.cardQuestion && this.state.cardAnswer) &&
            <Button
              text='Save this Card'
              onPress={this.saveCard}
              roundedBorders={{
                topLeft: true, topRight: true, bottomRight: true, bottomLeft: true
              }}
              />}
        </View>
      </View>
      );
  }
}


export default DeckAddCard;
