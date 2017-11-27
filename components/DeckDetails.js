import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from './Button';


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

    //return <TouchableOpacity onPress={() => navigation.navigate('DeckQuiz')}><Text>hi touch me</Text></TouchableOpacity>;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>{deck.title}</Text>
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
              onPress={ () => navigation.navigate('DeckQuiz') }
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }}
              />
        </View>
      </View>
    )
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
    textAlign: 'center',
    paddingBottom: 50
  }
});

export default DeckDetails;