import base64 from 'react-native-base64'
import axios from 'axios';

module.exports = {
  //user authentication
  userAuth : async () => {
    axios.get('https://accounts.spotify.com/authorize/',{
      params: { 
        'client_id': process.env.REACT_NATIVE_SPOTIFY_ID,
        'response_type': 'code',
        'redirect_uri': process.env.REACT_NATIVE_REDIRECT_URI,
      }
    }).then(res => console.log('res: ', res.code))
    // axios.get(`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_NATIVE_SPOTIFY_ID}&redirect_uri=${process.env.REACT_NATIVE_REDIRECT_URI}&response_type=token`)
    //   .then(res => {console.log(res); return (render(){res})})
  },
  // gets token
  getToken : () => {
    axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + base64.encode(`${process.env.REACT_NATIVE_SPOTIFY_ID}:${process.env.REACT_NATIVE_SPOTIFY_SECRET}`)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenResponse => {      
        return tokenResponse.data.access_token;
      })
  },
  // gets generes
  getGenres : (token) => {
    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${tokenResponse.data.access_token}`}
    })
    .then (genreResponse => {        
      return ({
        listOfGenresFromAPI: genreResponse.data.categories.items
      })
    });
  }
}

export default module.exports;