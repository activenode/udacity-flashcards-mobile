import { StyleSheet } from 'react-native';
import iosElse from './ios-else';
import boxShadows from './box-shadows';
import {blackyGrey} from './colors';

const styles = StyleSheet.create({
  verticalCenteredPaddContainer: {
    flex: 1,
    padding: 40,
    justifyContent: 'center'
  },
  centerText: {
    textAlign: 'center'
  },
  btnContainer: {
    height: 52,
    marginTop: 15
  },
  headline: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center'
  },
  headline2: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  headline3: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: blackyGrey
  },
  input: {
    marginTop: 20,
    borderRadius: iosElse(16, 0),
    borderWidth: iosElse(2, 0),
    borderColor: 'blue',
    paddingLeft: 20,
    paddingRight: 20,
    height: 52,
    textAlign: 'center',
    fontSize: iosElse(14, 16),
    ...boxShadows
  },
  infoContainer: {
    backgroundColor: '#bbbbbb'
  }
});

export default styles;