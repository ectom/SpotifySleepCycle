import base64 from 'react-native-base64'
import axios from 'axios';

module.exports = {
  // gets token
  getToken: async () => {
    return axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64.encode(`${process.env.REACT_NATIVE_SPOTIFY_ID}:${process.env.REACT_NATIVE_SPOTIFY_SECRET}`)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
  },
  // gets generes
  getGenres: (token) => {
    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenResponse.data.access_token}` }
    })
      .then(genreResponse => {
        return ({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
  }
}

export default module.exports;