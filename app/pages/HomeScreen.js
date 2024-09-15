import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Root } from 'react-native-alert-notification';
import background from '../../assets/background.png';

export default function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState('');

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + 
      '((\\d{1,3}\\.){3}\\d{1,3}))' + 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 'i'
    );
    return urlPattern.test(url);
  };

  const handleSubmit = async () => {
    if (!inputUrl.trim()) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'Please enter a URL.',
      });
      return;
    }

    if (!validateUrl(inputUrl)) {
      Dialog.show({
        type: ALERT_TYPE.WARNING, 
        textBody: 'Please enter a valid URL in the format http(s)://www.example.com',
      });
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.13:5000/classify', { 
        url: inputUrl
      });
      const classification = response.data.result;
      setResult(classification);

      if (classification === 'Malicious URL') {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'The URL is malicious',
          
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'The URL is safe.',
          
        });
      }
    } catch (error) {
      console.error(error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'An error occurred while processing the URL.',
      });
    }
  };

  const handleClear = () => {
    setInputUrl('');
  };

  return (
    <Root>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.container}>
          
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Enter URL"
              value={inputUrl}
              onChangeText={setInputUrl}
            />
            {inputUrl.length > 0 && (
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.customButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Root>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 70,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 60,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 5,
    padding: 5,
  },
  clearButtonText: {
    color: 'black',
  },
  customButton: {
    backgroundColor: 'rgb(80, 196, 237)',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20,
    borderRadius:15
  },
  buttonText: {
    color: 'black',
    fontWeight:'bold'
  },
  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: -250,
    fontFamily: 'Arial',
  },
});
