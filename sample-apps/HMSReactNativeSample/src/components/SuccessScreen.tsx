/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {useAuth} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigator';
import HMSSDK from '@100mslive/react-native-hms';
import Config from 'react-native-config';
import {useDispatch} from 'react-redux';
import {saveUserData} from '../redux/actions';

type MeetingScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'MeetingScreen'
>;

type SuccessScreenNavigationProp = RouteProp<
  AppStackParamList,
  'SuccessScreen'
>;

export default function SuccessScreen() {
  const navigation = useNavigation<MeetingScreenNavigationProp>();

  const route = useRoute<SuccessScreenNavigationProp>();
  const dispatch = useDispatch();

  const {user} = useAuth();

  const {uid, sessionId} = route.params || {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const successSubscription = async () => {
      if (uid && sessionId) {
        try {
          await firestore()
            .collection('subscriptions')
            .doc(uid)
            .set({isSubscribed: true}, {merge: true});
          console.log('Subscription success for UID:', uid);
        } catch (error) {
          console.error('Error in subscription:', error);
        }
      } else {
        console.error('UID or Session ID missing in params');
      }
    };
    successSubscription();

    const countInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(countInterval);
          return 1;
        }
        return prev + 0.2;
      });
    }, 1000) as unknown as number;

    const timer = setTimeout(() => {
      (async () => {
        const hmsInstance = await HMSSDK.build();
        const token = Config.AUTH_TOKEN ? Config.AUTH_TOKEN : '';
        const userName = Config.USER_NAME ? Config.USER_NAME : 'Néző';
        await hmsInstance.join({authToken: token, username: userName});
        dispatch(saveUserData({hmsInstance}));
        navigation.navigate('MeetingScreen');
      })();
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(countInterval);
    };
  }, [uid, sessionId, navigation, user, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Előfizetés sikeres</Text>
      <Text style={styles.text}>
        Az előfizetési folyamat sikeres volt. 15 másodperc múlva
        visszairányítunk.
      </Text>
      <Progress.Bar
        progress={progress}
        width={200}
        animated
        style={{marginTop: 16}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  text: {textAlign: 'center', marginBottom: 10},
});
