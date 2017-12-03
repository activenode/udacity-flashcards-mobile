import React from 'react';
import {
  Text,
  View,
  Switch,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import commonStyles from '../utils/common-styles';
import iosElse from '../utils/ios-else';
import boxShadows from '../utils/box-shadows';
import { cardColor, coolLightYellow } from '../utils/colors';


class QuizCard extends React.Component {
  state = {
    isFlipped: false,
    isFlippedInView: false,
    flipAnim: new Animated.Value(0)
  }

  animListenerIsFlippedInView = ({value}) => {
    if (value >= 0.5 && !this.state.isFlippedInView) {
      this.setState({isFlippedInView: true});
      this.state.flipAnim.removeListener(this.animListenerIsFlippedInView);
    }
  }

  animListenerIsNotFlippedInView = ({value}) => {
    if (value >= 0.5 && this.state.isFlippedInView) {
      this.setState({isFlippedInView: false});
      this.state.flipAnim.removeListener(this.animListenerIsNotFlippedInView);
    }
  }

  flip = () => {
    this.state.flipAnim.removeAllListeners();
    this.state.flipAnim.stopAnimation();
    this.state.flipAnim.setValue(0);
    const isFlippedNow = this.state.isFlipped;
    this.setState({isFlipped: !isFlippedNow});

    if (!isFlippedNow) {
      this.state.flipAnim.addListener(this.animListenerIsFlippedInView);
    } else {
      this.state.flipAnim.addListener(this.animListenerIsNotFlippedInView);
    }

    Animated.timing(this.state.flipAnim, { duration: 250, toValue: 1}).start();
  }

  render() {
    const spin = this.state.flipAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '90deg', '0deg']
    });

    return (
      <TouchableWithoutFeedback onPress={this.flip}>
        <Animated.View style={[styles.cardContainer, {transform: [{
            rotateY: spin
          }]}]}>
          <Text style={commonStyles.headline2}>{this.props.question}</Text>
          {this.state.isFlippedInView &&
            <Text style={[commonStyles.text, commonStyles.centerText, { marginTop: 15 }]}>
              {this.props.answer}
            </Text>}
        </Animated.View>
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