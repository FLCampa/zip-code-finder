// External Libraries
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

// Services
import api from './src/services/api';

function App() {
  // States
  const inputRef = useRef(null);
  const [zipCode, setZipCode] = useState('');
  const [userZipCode, setUserZipCode] = useState(null);

  // Functions
  async function search() {
    if (zipCode == '') {
      alert('Enter a valid zip code');
      setZipCode('');
      return;
    }

    try {
      const response = await api.get(`/${zipCode}/json`);
      setUserZipCode(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  }

  function clear() {
    setZipCode('');
    setUserZipCode(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Enter the zip code</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000"
          value={zipCode}
          onChangeText={text => setZipCode(text)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={[styles.button, styles.search]}
          onPress={search}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clear]} onPress={clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {userZipCode && (
        <View style={styles.resultArea}>
          <Text style={styles.textItem}>Zip Code: {userZipCode.cep}</Text>
          <Text style={styles.textItem}>Address: {userZipCode.logradouro}</Text>
          <Text style={styles.textItem}>District: {userZipCode.bairro}</Text>
          <Text style={styles.textItem}>City: {userZipCode.localidade}</Text>
          <Text style={styles.textItem}>State: {userZipCode.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// Stylization
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonArea: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  search: {
    backgroundColor: '#1d75cd',
  },
  clear: {
    backgroundColor: 'red',
  },
  resultArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default App;
