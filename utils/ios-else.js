import { Platform } from 'react-native';

export default function iosElse(ifIos, ifAndroid) {
  return Platform.OS === 'ios' ? ifIos : ifAndroid;
}
