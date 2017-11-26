import { Platform } from 'react-native';
import iosElse from './ios-else';

export const greyWhite = '#efefef';
export const transparentWhite = 'rgba(255, 255, 255, 0.3)';
export const blackyGrey = '#444';
export const coolAction = iosElse('blue', '#2196f3');
export const coolDanger = iosElse('red', '#e91e63');
export const androidGrey = '#efefef';
export const statusBarBg = iosElse('#333', coolAction);