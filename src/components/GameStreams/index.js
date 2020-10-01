import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import api from 'src/api';
import './gameStream.scss';

const GameStreams = () => {
  const location = useLocation();
  const { slug } = useParams();
  console.log(location);

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);

      const dataArray = result.data.data;

      let finalArray = dataArray.map((stream) => {
        const newURL = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');
        stream.thumbnail_url = newURL;
        return stream;
      });

      // calcul du total des viewers
      const totalViewers = finalArray.reduce((acc, val) => acc + val.viewer_count, 0);

      const userIDs = dataArray.map((stream) => stream.user_id);

      const baseURL = 'https://api.twitch.tv/helix/users?';
      let queryParamsUsers = '';

      userIDs.map((id) => (queryParamsUsers += `id=${id}&`));
      const finalURL = baseURL + queryParamsUsers;
      const getUsersLogin = await api.get(finalURL);

      const userLoginArray = getUsersLogin.data.data;

      finalArray = dataArray.map((stream) => {
        stream.login = '';

        userLoginArray.forEach((login) => {
          if (stream.user_id === login.id) {
            stream.login = login.login;
          }
        });
        return stream;
      });
      setViewers(totalViewers);
      setStreamData(finalArray);
    };

    fetchData();
  }, []);

  console.log('viewers: ', viewers, 'streamData: ', streamData);

  return (
    <div className="">
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
      <h1 className="titreGamesStreams">Stream : {slug}</h1>
      <h3 className="sousTitregamesStreams">
         Viewers :<strong className="textColored"> {viewers} </strong> personnes regardent {slug} .
      </h3>

      <div className="flexAccueil">

        {streamData.map((stream, index) => (

          <div key={index} className="carteGameStream">

            <img src={stream.thumbnail_url} alt="Image du jeu" className="imageCarte" />

            <div className="carteBodyGameStreams">

              <h5 className="titreCarteStream">{stream.user_name}</h5>

              <p className="textStream"> Nombre de viewers : {stream.viewer_count} </p>

              <Link
                className="lien"
                to={{
                  pathname: `/live/${stream.login}`,
                }}
              >
                <div className="btnCarte">Regarder {stream.user_name}</div>
              </Link>
            </div>
          </div>
        )) };
      </div>
    </div>
  );
};

export default GameStreams;
