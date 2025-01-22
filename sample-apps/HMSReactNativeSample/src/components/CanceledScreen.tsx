/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {useAuth} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigator';

type SubScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'SubscriptionScreen'
>;

type CanceledScreenNavigationProp = RouteProp<
  AppStackParamList,
  'CanceledScreen'
>;

export default function CanceledScreen() {
  const navigation = useNavigation<SubScreenNavigationProp>();

  const route = useRoute<CanceledScreenNavigationProp>();
  const {user} = useAuth();

  const {uid, sessionId} = route.params || {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canceledSubscription = async () => {
      if (uid && sessionId) {
        try {
          await firestore()
            .collection('subscriptions')
            .doc(uid)
            .set({isSubscribed: false}, {merge: true});
          console.log('Subscription canceled for UID:', uid);
        } catch (error) {
          console.error('Error canceling subscription:', error);
        }
      } else {
        console.error('UID or Session ID missing in params');
      }
    };
    canceledSubscription();

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
      navigation.navigate('SubscriptionScreen');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(countInterval);
    };
  }, [uid, sessionId, navigation, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Előfizetés megszakadt</Text>
      <Text style={styles.text}>
        Az előfizetési folyamat megszakadt. 5 másodperc múlva visszatérünk.
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
