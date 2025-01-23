import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigator';
import {useAuth} from '../context/AuthContext';
import Config from 'react-native-config';
import HMSSDK from '@100mslive/react-native-hms';
import {useDispatch} from 'react-redux';
import {saveUserData} from '../redux/actions';

type LogicScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'LogicScreen'
>;

export default function LogicScreen() {
  const navigation = useNavigation<LogicScreenNavigationProp>();

  const dispatch = useDispatch();
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
      (async () => {
        const hmsInstance = await HMSSDK.build();
        const token = Config.AUTH_TOKEN ? Config.AUTH_TOKEN : '';
        const userName = Config.USER_NAME ? Config.USER_NAME : 'Néző';
        await hmsInstance.join({authToken: token, username: userName});
        dispatch(saveUserData({hmsInstance}));
        navigation.navigate('MeetingScreen');
      })();
    }
  }, [user, hasAccess, loading, navigation, dispatch]);

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
