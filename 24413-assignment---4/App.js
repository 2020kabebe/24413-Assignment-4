import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import ContactsScreen from './ContactsScreen';
import EditProfileScreen from './EditProfileScreen';

const translations = {
  en: { greeting: 'Hello!', selectFromGallery: 'Select from Gallery', takePicture: 'Take a Picture', contactList: 'Contact List', noProfilePicture: 'No Profile Picture Selected' },
  fr: { greeting: 'Bonjour!', selectFromGallery: 'Sélectionner dans la galerie', takePicture: 'Prendre une photo', contactList: 'Liste de contacts', noProfilePicture: 'Aucune photo de profil sélectionnée' },
};

i18n.translations = translations;
i18n.locale = Localization.locale.split('-')[0];

const App = () => {
  const [locale, setLocale] = useState(i18n.locale);

  const changeLanguage = (languageCode) => {
    i18n.locale = languageCode;
    setLocale(languageCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{i18n.t('greeting')}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Switch to French" onPress={() => changeLanguage('fr')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Switch to English" onPress={() => changeLanguage('en')} />
        </View>
      </View>
      <ContactsScreen />
      <EditProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    marginHorizontal: 10,
  },
});

export default App;
