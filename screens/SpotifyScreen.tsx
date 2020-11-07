import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import api from '../api/spotifyApi';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Linking from 'expo-linking';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
const scopes = [
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
  'playlist-read-collaborative',
  'playlist-read-private',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-follow-read',
  'user-follow-modify',
  'user-library-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state'
]

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const secureState = uuidv4();
console.log('secure', secureState);

const SpotifyScreen = () => {
  // These will hold info from API such as token, genre, etc
  const [accessToken, setAccessToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [scope, setScope] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${process.env.REACT_NATIVE_SPOTIFY_ID}`,
      responseType: 'code',
      scopes: scopes,
      state: secureState,
      usePKCE: false,
      redirectUri: makeRedirectUri({
        native: Linking.makeUrl(),
      }),
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === 'success') {
      const auth = response.params;
      if (Platform.OS !== 'web') {
        SecureStore.setItemAsync('AUTH_CODE', auth.code);
        SecureStore.setItemAsync('AUTH_STATE', auth.state);
      }
      const tokenResponse = api.getToken();      
      tokenResponse.then(res => {
        if(res.status == 200){
          console.log(res.data);
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
          setScope(res.data.scope);
          setTokenType(res.data.token_type);
        }
      
      })

    }
  }, [response]);

  const logout = () => {
    const data = api.logout();
    data.then(res => console.log(res));
    setAccessToken('');
    setExpiresIn('');
    setScope('');
    setTokenType('');
    SecureStore.deleteItemAsync('AUTH_CODE')
    SecureStore.deleteItemAsync('AUTH_STATE')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify</Text>
      {accessToken ? 
        <Button
        onPress={() => { logout() }}
        title="Logout"
      /> :
      <Button
        onPress={() => { promptAsync() }}
        disabled={!request}
        title="Login"
        color="#1DB954"
      />        
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default SpotifyScreen;
