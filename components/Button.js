import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {coolAction, coolDanger, coolAlternate, transparentWhite, semiTransparentWhite} from '../utils/colors';
import iosElse from '../utils/ios-else';
import boxShadows from '../utils/box-shadows';
import { Ionicons } from '@expo/vector-icons';

export const BTN_DEFAULT = 'default';
export const BTN_DANGER = 'danger';
export const BTN_ALTERNATE = 'alternate';

export default function Button({
  text,
  onPress,
  roundedBorders = {},
  flex,
  icon,
  type = BTN_DEFAULT
}) {
  const applyBorderStyles = iosElse(
    Object.keys(roundedBorders).reduce((stylesArr, styleKey) => {
      if (styles[styleKey]) {
        return stylesArr.concat(styles[styleKey]);
      }

      return stylesArr;
    }, []),
    []
  );

  let extraStyles,
    iconColor;
  switch (type) {
    case BTN_DANGER:
      extraStyles = { btn: styles.btnDanger, text: styles.dangerText };
      iconColor = iosElse(coolDanger, 'white');
      break;
    case BTN_ALTERNATE:
      extraStyles = { btn: styles.btnAlternate, text: styles.altText };
      iconColor = iosElse(coolAlternate, 'white');
      break;
    default:
      extraStyles = {};
      iconColor = iosElse(coolAction, 'white');
  }

  if (flex) {
    extraStyles.btn = {
      ...(extraStyles.btn || {}),
      flex
    };
  }

  return (
    <TouchableOpacity
      style={[styles.btn, extraStyles.btn].concat(applyBorderStyles)}
      onPress={onPress}>
      { typeof text === 'string' && <Text style={[styles.centerText, extraStyles.text]}>{text}</Text>}
      { typeof icon === 'string' &&
        <Ionicons
          style={styles.icon}
          name={icon}
          size={30}
          color={iconColor} />}
    </TouchableOpacity>
  );
}


const borderRadius = iosElse(16, 0);
const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  },
  centerText: {
    textAlign: 'center',
    color: iosElse(coolAction, 'white'),
    fontSize: 15,
    fontWeight: '700'
  },
  btn: {
    padding: 10,
    flex: 1,
    borderWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: iosElse(coolAction, semiTransparentWhite),
    backgroundColor: iosElse(transparentWhite, coolAction),
    justifyContent: 'center',
    ...boxShadows
  },
  btnDanger: {
    backgroundColor: iosElse(transparentWhite, coolDanger),
    borderColor: iosElse(coolDanger, semiTransparentWhite)
  },
  btnAlternate: {
    backgroundColor: iosElse(transparentWhite, coolAlternate),
    borderColor: iosElse(coolAlternate, semiTransparentWhite)
  },
  dangerText: {
    color: iosElse(coolDanger, 'white')
  },
  altText: {
    color: iosElse(coolAlternate, 'white')
  },
  topLeft: {
    borderTopLeftRadius: borderRadius
  },
  topRight: {
    borderTopRightRadius: borderRadius
  },
  bottomLeft: {
    borderBottomLeftRadius: borderRadius
  },
  bottomRight: {
    borderBottomRightRadius: borderRadius
  }
});