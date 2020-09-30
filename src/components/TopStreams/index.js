import React, { useEffect, useState } from 'react';
import api from 'src/api';
import './topstream.scss';
import { Link } from 'react-router-dom';

const TopStreams = () => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Appel à l'API pour récupérer les top stream
      const result = await api.get('https://api.twitch.tv/helix/streams');
      const dataArray = result.data.data;
      // Je viens map le tableau pour récupérer les id dont j'aurai besoin pour la suite
      const gameIds = dataArray.map((stream) => stream.game_id);
      const userIds = dataArray.map((stream) => stream.user_id);
      // console.log(gameIds);
      // console.log(userIds);
      // Création des url personnalisés
      const baseUrlGames = 'https://api.twitch.tv/helix/games?';
      const baseUrlUSers = 'https://api.twitch.tv/helix/users?';

      let queryParamsGame = '';
      let queryParamsUsers = '';
      // Je viens concaténer pour remplir mon url
      gameIds.map((id) => (queryParamsGame += `id=${id}&`));

      userIds.map((id) => (queryParamsUsers += `id=${id}&`));
      // Je viens additionner mes 2 bout d'url
      const urlFinalGames = baseUrlGames + queryParamsGame;
      const urlFinalUsers = baseUrlUSers + queryParamsUsers;

      // console.log(urlFinalGames);
      // console.log(urlFinalUsers);

      const gameName = await api.get(urlFinalGames);
      const getUsers = await api.get(urlFinalUsers);

      const gameNameArray = gameName.data.data;
      const UsersArray = getUsers.data.data;

      // Création du tableau final

      const finalArray = dataArray.map((stream) => {
        stream.gameName = '';
        stream.login = '';

        gameNameArray.forEach((name) => {
          UsersArray.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });
        const newUrl = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');

        stream.thumbnail_url = newUrl;
        return stream;
      });
      setChannels(finalArray);
    };
    fetchData();
  }, []);

  return (

    <div>
      <h1 className="titreGames">Stream les plus populaires</h1>
      <div className="flexAccueil">

        {channels.map((channel, index) => (
          <div key={index} className="carteStream">
            <img src={channel.thumbnail_url} alt="image du stream" className="imageCarte" />

            <div className="cardBodyStream">

              <h5 className="titreCarteStream">{channel.user_name}</h5>

              <p className="textStream">{channel.gameName}</p>

              <p className="textStream viewers">{channel.viewer_count}</p>
              <Link className="lien" to={{ pathname: `/live/${channel.login}` }}>
              <div className="btnCarte">Regarder {channel.user_name}</div>
              </Link>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
export default TopStreams;
