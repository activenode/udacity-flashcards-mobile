import { Platform } from 'react-native';
import iosElse from './ios-else';

export const greyWhite = '#efefef';
export const lightGrey = '#ccc';
export const semiTransparentWhite = 'rgba(255, 255, 255, 0.5)';
export const transparentWhite = 'rgba(255, 255, 255, 0.27)';
export const blackyGrey = '#444';
export const darkGrey = '#555';
export const coolAction = iosElse('blue', '#2196f3');
export const coolDanger = iosElse('#e12518', '#e91e63');
export const coolAlternate = iosElse('black', '#607d8b');
export const cardColor = '#f1f1f0';
export const coolGreen = '#4caf50';
export const androidGrey = '#efefef';
export const statusBarBg = iosElse('#333', coolAction);