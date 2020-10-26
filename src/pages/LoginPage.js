import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LoginPage = () => {
  const [user, setUser] = useState('Username');
  const [pass, setPass] = useState('');

  const loginRequest = () => {
    Alert.alert(process.env.REACT_NATIVE_SPOTIFY_ID)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput 
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setUser(text)}
        value={user}
      />
      <TextInput 
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPass(text)}
        secureTextEntry={true}
        value={pass}
      />
      <Button
        title="Press me"
        onPress={loginRequest}
      />
    </View>
  );
};

export default LoginPage;