import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigator';
import {useAuth} from '../context/AuthContext';

type LogicScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'LogicScreen'
>;

export default function LogicScreen() {
  // Provide the type param here:
  const navigation = useNavigation<LogicScreenNavigationProp>();

  const {user, hasAccess, loading} = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigation.navigate('Login');
    } else if (!hasAccess) {
      navigation.navigate('SubscriptionScreen');
    } else {
      navigation.navigate('MeetingScreen');
    }
  }, [user, hasAccess, loading, navigation]);

  if (loading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}
