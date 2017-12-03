import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { lightGrey, coolDanger, coolGreen, transparentWhite , darkGrey } from '../utils/colors';
import commonStyles from '../utils/common-styles';
import QuizCard from './QuizCard';
import QuizSummary from './QuizSummary';
import iosElse from '../utils/ios-else';
import shuffle from 'shuffle-array';

class DeckQuiz extends React.Component {
  state = {
    cardBounceValue: new Animated.Value(1)
  }

  resetState() {
    this.setState({
      deckTitle: null,
      cards: [],
      currentCardIndex: 0,
      correctAnswersCount: 0
    });
  }

  markCorrect = () => {
    this.setState(state => ({
      ...state,
      correctAnswersCount: state.correctAnswersCount + 1,
      currentCardIndex: state.currentCardIndex + 1
    }));
  }

  markIncorrect = () => {
    this.setState(state => ({
      ...state,
      currentCardIndex: state.currentCardIndex + 1
    }));
  }

  componentWillMount() {
    this.resetState();
  }

  componentDidMount() {
    const { navigation: { state: { params }} } = this.props;
    const { deck } = params;

    this.setState({
      deckTitle: params.deck.title,
      cards: shuffle(Array.isArray(deck.cards) ? deck.cards : [])
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.cards.length !== this.state.cards.length
        || prevState.currentCardIndex !== this.state.currentCardIndex)
      && this.state.currentCardIndex < this.state.cards.length) {
        // let's animate to indicate that there is a new card
        Animated.sequence([
          Animated.timing(this.state.cardBounceValue, { duration: 150, toValue: 1.07}),
          Animated.spring(this.state.cardBounceValue, { toValue: 1, friction: 4})
        ]).start();
      }
  }

  restartQuiz = () => {
    this.setState(state => ({
      ...state,
      currentCardIndex: 0,
      correctAnswersCount: 0,
      cards: shuffle(state.cards)
    }));
  }

  backToDeck = () => {
    this.props.navigation.goBack();
  }

  render() {
    if (!this.state.cards || this.state.cards.length === 0) {
      return (
        <View style={[commonStyles.verticalCenteredPaddContainer, commonStyles.infoContainer]}>
          <Text style={[commonStyles.centerText, commonStyles.headline2]}>No cards in this deck available.</Text>
        </View>
      )
    }

    const progressPercentage = Math.round(((this.state.currentCardIndex + 1) / this.state.cards.length) * 100);
    const isDone = progressPercentage + Number.EPSILON > 100; // avoiding floating point precision failures

    if (isDone) {
      return (
        <QuizSummary
          deckTitle={this.state.deckTitle}
          totalCardsCount={this.state.cards.length}
          correctCardsCount={this.state.correctAnswersCount}
          onRestartQuiz={this.restartQuiz}
          onBackToDeck={this.backToDeck}
          />
      );
    }

    const currentCard = this.state.cards[this.state.currentCardIndex];
    return (
      <View style={{flex: 1, backgroundColor: darkGrey}}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}></View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{this.state.currentCardIndex + 1} / {this.state.cards.length}</Text>
        </View>
        <View style={commonStyles.verticalCenteredPaddContainer}>
          {this.state.currentCardIndex < this.state.cards.length &&
            <Animated.View style={{transform: [{ scale: this.state.cardBounceValue}]}}>
              <QuizCard
                question={currentCard.question}
                answer={currentCard.answer} />
            </Animated.View>}
        </View>

        <Text style={[commonStyles.centerText, styles.infoText]}>Tap on the card to see the answer</Text>
        <View style={styles.actionBar}>
            <Text style={{color: lightGrey}}>Mark as:</Text>

            <View style={styles.actionBarItems}>
              <TouchableOpacity style={[styles.actionBarBtn, { marginRight: 15 }]} onPress={this.markIncorrect}>
                <Text style={[styles.actionBarBtnText, {color: coolDanger}]}>INCORRECT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBarBtn} onPress={this.markCorrect}>
                <Text style={[styles.actionBarBtnText, {color: coolGreen}]}>CORRECT</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoText: {
    color: 'white',
    fontSize: 12,
    padding: 5
  },
  progressBar: {
    width: 0,
    height: 7,
    backgroundColor: 'rgba(200,190,200,0.55)',
  },
  progressText: {
    color: 'white'
  },
  progressTextContainer: {
    padding: 15
  },
  actionBar: {
    padding: 15,
    paddingBottom: 25,
    borderColor: 'black',
    borderTopWidth: 3,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  actionBarItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  actionBarBtn: {
    padding: 15,
    paddingRight: 19,
    paddingLeft: 19,
    borderWidth: 2,
    borderRadius: iosElse(16, 0),
    backgroundColor: iosElse(undefined, '#eee'),
    borderColor: iosElse('#eee', transparentWhite)
  },
  actionBarBtnText: {
    fontSize: 16,
    fontWeight: '700'
  }
});

export default DeckQuiz;