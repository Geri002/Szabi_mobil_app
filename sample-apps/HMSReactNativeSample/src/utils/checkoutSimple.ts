import {Linking} from 'react-native';

export const handleCheckout = async (uid: string) => {
  try {
    const response = await fetch(
      'https://us-central1-balaton-autosisklola-live.cloudfunctions.net/createSimplePaySession',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid}),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.paymentUrl) {
      Linking.openURL(data.paymentUrl);
    } else {
      throw new Error('Failed to obtain payment URL');
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};
