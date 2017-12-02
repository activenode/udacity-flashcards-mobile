import React from 'react';
import {Text, View, Switch, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import commonStyles from '../utils/common-styles';
import iosElse from '../utils/ios-else';
import boxShadows from '../utils/box-shadows';
import { cardColor, coolLightYellow } from '../utils/colors';


class QuizCard extends React.Component {
  state = {
    isFlipped: false
  }

  flip = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.flip}>
        <View style={styles.cardContainer}>
          <Text style={commonStyles.headline2}>{this.props.question}</Text>
          {this.state.isFlipped &&
            <Text style={[commonStyles.text, commonStyles.centerText, { marginTop: 15 }]}>
              {this.props.answer}
            </Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default QuizCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: cardColor,
    borderRadius: iosElse(16, 0),
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)'
  }
});