import React from 'react';
import { Text, View, Switch, StyleSheet, Animated } from 'react-native';
import commonStyles from '../utils/common-styles';
import { blackyGrey, semiTransparentWhite , highlightGreen, coolGreen } from '../utils/colors';
import Button, { BTN_ONDARK, BTN_ONDARK_SIMPLE } from './Button';
import { scheduleNextNotificationTomorrow } from '../utils/notify';


export default class QuizSummary extends React.Component {
  state = {
    fadeResultsValue: new Animated.Value(0)
  }

  componentWillMount() {
    this.state.fadeResultsValue.setValue(0);
  }

  componentDidMount() {
    scheduleNextNotificationTomorrow();

    Animated.timing(this.state.fadeResultsValue, {
      toValue: 1,
      duration: 700
    }).start();
  }

  render() {
    const {
      deckTitle,
      totalCardsCount,
      correctCardsCount,
      onRestartQuiz,
      onBackToDeck
    } = this.props;

    const roundedPercentsSuccess = ((correctCardsCount / totalCardsCount) * 100);

    return (
      <View style={[commonStyles.verticalCenteredPaddContainer, styles.container]}>
        <Animated.View style={{ opacity: this.state.fadeResultsValue }}>
          <Text style={[commonStyles.headline, styles.whiteText]}>Your Quiz Results</Text>

          <Text style={[
            commonStyles.headline2,
            styles.successRate,
            roundedPercentsSuccess < 100 ? styles.whiteText : styles.highlightText
            ]}>
            { roundedPercentsSuccess.toFixed(0) }% Success Rate
          </Text>
    
          <View style={styles.metric}>
            <Text style={[styles.metricValue, styles.whiteText]}>{totalCardsCount}</Text>
            <Text style={[styles.greyText]}>{totalCardsCount === 1 ? 'Card' : 'Cards'} total</Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricValue, styles.whiteText]}>{correctCardsCount} / {totalCardsCount}</Text>
            <Text style={[styles.greyText]}>correctly answered</Text>
          </View>
    
          <View style={[commonStyles.btnContainer, { marginTop: 75 }]}>
            <Button
              onPress={onRestartQuiz}
              text='Restart the Quiz'
              type={BTN_ONDARK}
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }} />
          </View>
          <View style={[commonStyles.btnContainer]}>
            <Button
              onPress={onBackToDeck}
              text='Back to Deck'
              type={BTN_ONDARK_SIMPLE}
              roundedBorders={{ topLeft: true, topRight: true, bottomRight: true, bottomLeft: true }} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: blackyGrey,
    alignItems: 'center'
  },
  successRate: {
    marginTop: 22,
    marginBottom: 15,
    fontWeight: '200'
  },
  whiteText: {
    color: 'white'
  },
  highlightText: {
    color: coolGreen
  },
  greyText: {
    color: semiTransparentWhite
  },
  metric: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: semiTransparentWhite,
    paddingTop: 8,
    alignItems: 'center'
  },
  metricValue: {
    fontWeight: '800',
    fontSize: 24
  }
});
