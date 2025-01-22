import React, {useEffect} from 'react';
import {Platform, UIManager} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Welcome} from '../screens/Welcome';
import {Meeting} from '../screens/MeetingScreen/index';
// import {Meeting} from '../screens/Meeting';
import {QRCode} from '../screens/QRCode';
import {QRCodeScanner} from '../screens/QRCodeScanner';
import TermsScreen from '../components/TermsScreen';
import LoginScreen from '../components/LoginScreen';
import SubscriptionScreen from '../components/SubscriptionScreen';
import LogicScreen from '../components/LogicScreen';
import CanceledScreen from '../components/CanceledScreen';
import FailScreen from '../components/FailScreen';
import TimeoutScreen from '../components/TimeoutScreen';
import SuccessScreen from '../components/SuccessScreen';

export type AppStackParamList = {
  WelcomeScreen: undefined;
  MeetingScreen: undefined;
  QRCodeScreen: undefined;
  QRCodeScannerScreen: undefined;
  TermsScreen: undefined;
  Login: undefined;
  SubscriptionScreen: undefined;
  LogicScreen: undefined;
  CanceledScreen: {
    uid: undefined;
    sessionId: undefined;
  };
  FailScreen: {
    uid: undefined;
    sessionId: undefined;
  };
  TimeoutScreen: {
    uid: undefined;
    sessionId: undefined;
  };
  SuccessScreen: {
    uid: undefined;
    sessionId: undefined;
  };
};

export type LogicScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'LogicScreen'
>;

export type SubScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'SubscriptionScreen'
>;

export type CanceledScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'CanceledScreen'
>;

export type FailScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'FailScreen'
>;

export type TimeoutScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'TimeoutScreen'
>;

export type SuccessScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'SuccessScreen'
>;

const AppStack = createNativeStackNavigator<AppStackParamList>();
const navigationOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const AppStackNavigator = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="LogicScreen">
        <AppStack.Screen
          name="LogicScreen"
          component={LogicScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="WelcomeScreen"
          component={Welcome}
          options={navigationOptions}
        />
        <AppStack.Screen
          name="MeetingScreen"
          component={Meeting}
          options={navigationOptions}
        />
        <AppStack.Screen
          name="QRCodeScreen"
          component={QRCode}
          options={navigationOptions}
        />
        <AppStack.Screen
          name="QRCodeScannerScreen"
          component={QRCodeScanner}
          options={navigationOptions}
        />
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerTitle: 'Bejelentkezés', headerShown: true}}
        />
        <AppStack.Screen
          name="TermsScreen"
          component={TermsScreen}
          options={{headerTitle: 'ÁSZF', headerShown: true}}
        />
        <AppStack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
          options={{headerTitle: 'Előfizetés', headerShown: true}}
        />
        <AppStack.Screen
          name="CanceledScreen"
          component={CanceledScreen}
          options={{headerTitle: 'Megszakítás', headerShown: true}}
        />
        <AppStack.Screen
          name="FailScreen"
          component={FailScreen}
          options={{headerTitle: 'Sikertelen', headerShown: true}}
        />
        <AppStack.Screen
          name="TimeoutScreen"
          component={TimeoutScreen}
          options={{headerTitle: 'Időtúllépés', headerShown: true}}
        />
        <AppStack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{headerTitle: 'Sikeres', headerShown: true}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
