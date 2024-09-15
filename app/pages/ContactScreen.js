import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Root } from 'react-native-alert-notification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 50,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  paragraphField: {
    height: 400,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 20,
  },
});

export default function ContactScreen() {
  const [emailText, setEmailText] = useState('');

  const handlePredict = () => {
    if (!emailText.trim()) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'Please enter the email content',
      });
      return;
    }

    const apiUrl = 'http://192.168.1.13:5001/predict';

    axios
      .post(apiUrl, { text: emailText })
      .then((response) => {
        const prediction = response.data.prediction;
        if (prediction === 'Spam') {
          Dialog.show({
            type: ALERT_TYPE.DANGER,  
            title: 'Warning',
            textBody: 'The email content is classified as spam.',
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS, 
            title: 'Success',
            textBody: 'The email content is classified as not spam.',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Error',
          textBody: 'Failed to get prediction. Please try again.',
        });
      });
  };

  return (
    <Root>
      <View style={styles.container}>
        <Text style={styles.heading}>Email Spam Detector</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.paragraphField}
            multiline
            numberOfLines={10}
            placeholder="Add the email content here"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
          />
        </View>
        <Button title="Predict" onPress={handlePredict} />
      </View>
    </Root>
  );
}
