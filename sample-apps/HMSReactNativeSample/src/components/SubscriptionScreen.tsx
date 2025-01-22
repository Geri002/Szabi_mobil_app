import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {handleCheckout} from '../utils/checkoutSimple';

export default function SubscriptionScreen() {
  const {user, logout} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      Alert.alert('Hiba', 'Felhasználói információ nem elérhető.');
      return;
    }

    setLoading(true);
    try {
      await handleCheckout(user.uid);
    } catch (error) {
      Alert.alert('Hiba', 'Nem sikerült létrehozni a fizetési folyamatot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Előfizetési csomag</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}>
          <Text style={styles.buttonText}>Előfizetés - 1000Ft/nap</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  subscribeButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontSize: 16},
});
