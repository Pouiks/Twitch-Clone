import axios from 'axios';

let api = axios.create({
  headers: {
    'Client-ID': "3zcgl7606mvsalpca9aqz7gb4rdxga",
    "Authorization": "Bearer 4oahpft2kle7ljfpdipvzhxwm0qp5a"
  },
});



// CLIENT_ID = 3zcgl7606mvsalpca9aqz7gb4rdxga
// REDIRECT = 'http://127.0.0.1/'

//LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

// LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=3zcgl7606mvsalpca9aqz7gb4rdxga&redirect_uri=http://127.0.0.1/&response_type=token

// Token = 4oahpft2kle7ljfpdipvzhxwm0qp5a

export default api;
