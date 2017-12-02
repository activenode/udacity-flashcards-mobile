import React from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import commonStyles from '../utils/common-styles';
import { Ionicons } from '@expo/vector-icons';
import { blackyGrey, semiTransparentWhite } from '../utils/colors';
import Button, { BTN_ONDARK, BTN_ONDARK_SIMPLE } from './Button';



export default function QuizSummary({
  deckTitle,
  totalCardsCount,
  correctCardsCount,
  onRestartQuiz,
  onBackToDeck
}) {
  return (
    <View style={[commonStyles.verticalCenteredPaddContainer, styles.container]}>
      <Text style={[commonStyles.headline, styles.whiteText]}>Your Quiz Results</Text>

      <Text style={[commonStyles.headline2, styles.successRate, styles.whiteText]}>
        { ((correctCardsCount / totalCardsCount) * 100).toFixed(0) }% Success Rate
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
    </View>
  )
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
