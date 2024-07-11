import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import i18n from 'i18n-js';

const mockContacts = [
  { id: '1', name: 'John Doe', imageUri: null },
  { id: '2', name: 'Jane Smith', imageUri: null },
  { id: '3', name: 'Michael Johnson', imageUri: null },
];

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactImageUri, setNewContactImageUri] = useState(null);

  useEffect(() => {
    // Simulate fetching contacts
    setContacts(mockContacts);
  }, []);

  const addContact = () => {
    if (newContactName.trim() === '') return;

    const newContact = {
      id: (contacts.length + 1).toString(),
      name: newContactName,
      imageUri: newContactImageUri,
    };
    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactImageUri(null);
    setModalVisible(false);
  };

  const selectImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewContactImageUri(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewContactImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t('contactList')}</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={styles.contactImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>{item.name.charAt(0)}</Text>
              </View>
            )}
            <Text style={styles.contactName}>{item.name}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={newContactName}
              onChangeText={setNewContactName}
            />
            {newContactImageUri ? (
              <Image source={{ uri: newContactImageUri }} style={styles.profileImage} />
            ) : (
              <Text style={styles.noProfileText}>{i18n.t('noProfilePicture')}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={selectImageFromGallery}>
              <Text style={styles.buttonText}>{i18n.t('selectFromGallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>{i18n.t('takePicture')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={addContact}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contactName: {
    fontSize: 16,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  noProfileText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ContactsScreen;
