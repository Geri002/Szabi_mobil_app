/* eslint-disable no-bitwise */
/* eslint-disable no-self-compare */
import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {AuthContextValue} from './AuthContextValue';

const AuthContext = (createContext < AuthContextValue) | (null > null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        const docRef = firestore()
          .collection('subscriptions')
          .doc(currentUser.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists && docSnap.data().isSubscribed) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } else {
        setUser(null);
        setHasAccess(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      setHasAccess(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const loginWithEmail = async (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  const registerWithEmail = async (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password);
  };

  //   const loginWithGoogle = async () => {
  //     try {
  //       GoogleSignin.configure({
  //         webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  //       });

  //       const { idToken } = await GoogleSignin.signIn();

  //       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //       return auth().signInWithCredential(googleCredential);
  //     } catch (error) {
  //       console.error('Google login error: ', error);
  //       throw error;
  //     }
  //   };

  const deleteUserAccount = async () => {
    if (user) {
      await firestore().collection('subscriptions').doc(user.uid).delete();
      await user.delete();
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    hasAccess,
    loginWithEmail,
    registerWithEmail,
    // loginWithGoogle,
    logout,
    deleteUserAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
