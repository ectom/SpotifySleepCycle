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

const SpotifyScreen = () => {

  // These will hold info from API such as token, genre, etc
  const [token, setToken] = useState('');
  useEffect(() => {

  }, []);
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${process.env.REACT_NATIVE_SPOTIFY_ID}`,
      scopes: ['user-read-email', 'playlist-modify-public'],
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
        SecureStore.setItemAsync("AUTH_CODE", auth.code);
        SecureStore.setItemAsync("AUTH_STATE", auth.state);
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/SpotifyScreen.js" />
      <Button
        onPress={() => { promptAsync() }}
        disabled={!request}
        title="Login"
        color="#1DB954"
      />
      {/* <Text>User token: {token}</Text> */}
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
