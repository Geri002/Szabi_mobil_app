/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigator';

type SubScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'SubscriptionScreen'
>;

type TimeoutScreenNavigationProp = RouteProp<
  AppStackParamList,
  'TimeoutScreen'
>;

export default function TimeoutScreen() {
  const route = useRoute<TimeoutScreenNavigationProp>();
  const navigation = useNavigation<SubScreenNavigationProp>();
  const {uid, sessionId} = route.params || {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeoutSubscription = async () => {
      if (uid && sessionId) {
        try {
          await firestore()
            .collection('subscriptions')
            .doc(uid)
            .set({isSubscribed: false}, {merge: true});
        } catch (error) {
          console.error('Error timeouting subscription:', error);
        }
      }
    };
    timeoutSubscription();

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
      clearInterval(countInterval);
      clearTimeout(timer);
    };
  }, [uid, sessionId, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Előfizetés időtúllépése</Text>
      <Text style={styles.text}>
        A fizetési folyamat sikertelen volt. 5 másodperc múlva visszatérünk.
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
