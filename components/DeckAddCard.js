import React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Button from './Button';
import { NavigationActions } from 'react-navigation';
import styles from '../utils/common-styles';

class DeckAddNew extends React.Component {
  static navigationOptions = ({navigation}) => {
    return 'Add a new Card';
  }

  state = {
    cardQuestion: '',
    cardAnswer: ''
  }

  saveCard = () => {
    const { screenProps: { saveCardAsync }, navigation } = this.props;
    const { cardQuestion, cardAnswer } = this.state;

    // reset the state
    this.setState({cardQuestion: '', cardAnswer: ''});

    //then make sure to save it async and go to detail view again
    saveCardAsync({cardQuestion, cardAnswer}).then(() => {
      navigation.dispatch(NavigationActions.back({ key: 'DeckAddCard' }))
    });
  }

  render() {
    return (
      <View style={styles.verticalCenteredPaddContainer}>
        <Text style={styles.headline}>Question of the Card:</Text>
        <TextInput
            style={styles.input}
            onChangeText={cardQuestion => this.setState({cardQuestion})}
            value={this.state.cardQuestion}
          />
        </View>
      </View>
      );
  }
}

export default DeckAddNew;