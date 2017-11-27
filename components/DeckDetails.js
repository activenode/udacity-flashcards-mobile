import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button, { BTN_ALTERNATE } from './Button';
import styles from '../utils/common-styles';


class DeckDetails extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params;
    return { title };
  }

  render() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    const { screenProps: { decks } } = this.props;
    const deck = decks.find(({id: deckId}) => id === deckId);
    const cardsCount = Array.isArray(deck.cards) ? deck.cards.length : 0;

    //return <TouchableOpacity onPress={() => navigation.navigate('DeckQuiz')}><Text>hi touch me</Text></TouchableOpacity>;
    return (
      <View style={styles.verticalCenteredPaddContainer}>
        <Text style={styles.headline}>{deck.title}</Text>
        <Text style={[styles.text, styles.centerText, { paddingTop: 4, paddingBottom: 8 }]}>{cardsCount} {cardsCount === 1 ? 'Card' : 'Cards'}</Text>
        <View style={styles.btnContainer}>
          <Button
              text='Add Card'
              onPress={ () => navigation.navigate('DeckAddCard') }
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }}
              />
        </View>
        <View style={styles.btnContainer}>
          <Button
              text='Start Quiz'
              type={BTN_ALTERNATE}
              onPress={ () => navigation.navigate('DeckQuiz') }
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }}
              />
        </View>
      </View>
    )
  }
}


export default DeckDetails;