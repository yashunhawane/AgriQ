/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

const PhotoUploadScreen = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [soilType, setSoilType] = useState('');
  const [pesticidesType, setPesticidesType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState('');

  const selectImage = async () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error:', response.error);
        // Handle error, e.g., show error message to user
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        // setImageData(response); // Not needed if you're not using it elsewhere
      }
    });
  };

  const uploadImage = async () => {
    try {
      const reference = storage().ref(selectedImage.split('/').pop()); // Extract filename
      await reference.putFile(selectedImage);
      const url = await reference.getDownloadURL();
      console.log('Image uploaded successfully. URL:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  const handleUpload = async () => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        Alert.alert('Error', 'No user logged in');
        return;
      }

      let imageUrlToStore = '';
      if (selectedImage) {
        imageUrlToStore = await uploadImage();
      }

      await firestore().collection('Post').add({
        userId: currentUser.uid,
        description: description,
        title: currentUser.displayName,
        soilType: soilType,
        pesticidesType: pesticidesType,
        imageUrl: imageUrlToStore,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Reset states after successful upload
      setDescription('');
      setSoilType('');
      setPesticidesType('');
      setSelectedImage(null);
      // imageUrlToStore('');

      navigation.navigate('FarmerHome');
      Alert.alert('Success', 'Data uploaded successfully');
    } catch (error) {
      console.error('Error uploading data:', error);
      Alert.alert('Error', 'Failed to upload data');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.image} />
      )}
      <TouchableOpacity style={styles.uploadButtonImage} onPress={selectImage}>
        <Text style={styles.uploadText}>Select photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Add a description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Add Soil Type"
        onChangeText={text => setSoilType(text)}
        value={soilType}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Add Pesticides Type"
        onChangeText={text => setPesticidesType(text)}
        value={pesticidesType}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  descriptionInput: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#343434',
    borderRadius: 10,
    width: 105,
    height: 35,
    margin: 15,
    textAlign: 'center',
    justifyContent: 'center',
  },
  uploadButtonImage: {
    backgroundColor: 'gray',
    borderRadius: 10,
    width: 200,
    height: 35,
    margin: 15,
    textAlign: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default PhotoUploadScreen;
