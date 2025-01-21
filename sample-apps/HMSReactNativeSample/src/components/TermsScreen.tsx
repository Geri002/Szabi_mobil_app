import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Általános Szerződési Feltételek</Text>
      <Text style={styles.body}>
        Amely létrejött a Balaton Autósiskola Kft., mint szolgáltató és a
        megrendelő között. Jelen szerződés elfogadásával a megrendelő tudomásul
        veszi,hogy az online oktatást illetve kresz táv oktatását 3. fél számára
        nem adja ki. Felvételt nem készít róla. Az élő közvetítéseken szereplők
        beleegyeztek a kép, hanganyag készítésébe. Az oktatás alatti kép és
        hangrögzítése az autósiskola iskolavezetője beleegyezésével zajlik. Az
        élő adás alatt az oktatási módszertanok eltérőek lehetnek. Esetleges
        trágár szavakért felelősségre nem vonhatóak a szereplők. A megrendelő
        beleegyezik, hogy a vásárlás után járó számlát elektronikus formában 48
        órán belül megkapja. A megrendelő beleegyezik, hogy az előfizetés az élő
        adás idejére vonatkozik, csak abban az időtartamban használható. A
        megrendelő elfogadja, hogy az internetkapcsolat függvényében a minőség
        ingadozhat, bizonyos esetekben megszakadhat. A megrendelő elfogadja,
        hogy amennyiben előfizet, a fizetés után, az oldalt nem frissíti, nem
        hagyja el, különben csak 5 percen elteltével kezdheti el nézni az élő
        adást. Tudomásul veszem, hogy a(z) Balaton Autósiskola Kft. (8600,
        Siófok Kristály utca 39.) adatkezelő által a(z) autosiskolabalaton.hu
        felhasználói adatbázisában tárolt alábbi személyes adataim átadásra
        kerülnek az OTP Mobil Kft., mint adatfeldolgozó részére. Az adatkezelő
        által továbbított adatok köre az alábbi: Név, email, irányítószám,
        város, utca, ország, telefonszám Az adatfeldolgozó által végzett
        adatfeldolgozási tevékenység jellege és célja a SimplePay Adatkezelési
        tájékoztatóban, az alábbi linken tekinthető meg:
        <a href="http://simplepay.hu/vasarlo-aff">
          http://simplepay.hu/vasarlo-aff
        </a>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
});
