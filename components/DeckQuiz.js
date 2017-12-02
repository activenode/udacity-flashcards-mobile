import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { coolAction } from '../utils/colors';
import commonStyles from '../utils/common-styles';
import QuizCard from './QuizCard';

class DeckQuiz extends React.Component {
  resetState() {
    this.setState({
      deckTitle: null,
      cards: [],
      currentCardIndex: 0,
      correctAnswersCount: 0
    });
  }

  componentWillMount() {
    this.resetState();
  }

  componentDidMount() {
    const { navigation: { state: { params }} } = this.props;
    const { deck } = params;

    this.setState({
      deckTitle: params.deck.title,
      cards: Array.isArray(deck.cards) ? deck.cards : []
    });

    console.log('navigation', params);
  }

  render() {
    if (!this.state.cards || this.state.cards.length === 0) {
      return (
        <View style={[commonStyles.verticalCenteredPaddContainer, commonStyles.infoContainer]}>
          <Text style={[commonStyles.centerText, commonStyles.headline2]}>No cards in this deck available.</Text>
        </View>
      )
    }

    const progressPercentage = ((this.state.currentCardIndex + 1) / (this.state.cards.length + 1)) * 100;
    const currentCard = this.state.cards[this.state.currentCardIndex];

    return (
      <View style={{flex: 1, backgroundColor: '#555'}}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}></View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{this.state.currentCardIndex + 1} / {this.state.cards.length}</Text>
        </View>
        <View style={commonStyles.verticalCenteredPaddContainer}>
          {this.state.currentCardIndex < this.state.cards.length &&
            <QuizCard question={currentCard.question} answer={currentCard.answer} />}
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    width: 0,
    height: 7,
    backgroundColor: 'rgba(200,190,200,0.55)',
  },
  progressText: {
    color: 'white'
  },
  progressTextContainer: {
    padding: 20
  }
});

export default DeckQuiz;