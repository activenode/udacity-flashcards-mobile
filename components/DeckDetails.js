import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button, { BTN_ALTERNATE } from './Button';
import commonStyles from '../utils/common-styles';


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

    return (
      <View style={commonStyles.verticalCenteredPaddContainer}>
        <Text style={commonStyles.headline}>{deck.title}</Text>
        <Text style={[commonStyles.text, commonStyles.centerText, { paddingTop: 4, paddingBottom: 8 }]}>{cardsCount} {cardsCount === 1 ? 'Card' : 'Cards'}</Text>
        <View style={commonStyles.btnContainer}>
          <Button
              text='Add Card'
              onPress={ () => navigation.navigate('DeckAddCard', { deckTitle: deck.title, deckId: deck.id }) }
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }}
              />
        </View>
        <View style={commonStyles.btnContainer}>
          { (cardsCount > 0) && <Button
              text='Start Quiz'
              type={BTN_ALTERNATE}
              onPress={ () => navigation.navigate('DeckQuiz', { deck }) }
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }}
              />}
        </View>
      </View>
    )
  }
}


export default DeckDetails;