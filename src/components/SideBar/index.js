import React, { useEffect, useState } from 'react';
import api from 'src/api';

import './sideBar.scss';

const SideBar = () => {
  const [topStreams, setTopStreams] = useState([]);

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
        stream.truePic = '';
        stream.login = '';

        gameNameArray.forEach((name) => {
          UsersArray.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.gameName = name.name;
              stream.truePic = user.profile_image_url;
              stream.login = user.login;
            }
          });
        });
        return stream;
      });
      setTopStreams(finalArray.slice(0, 6));
    };
    fetchData();
  }, []);

  console.log("topstream", topStreams);

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaîne recommandées</h2>
      <ul className="listeStream">

        {topStreams.map((stream, index) => (
          <li key={index} className="containerFlexSideBar">

            <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
            <div className="streamUser"> {stream.user_name}</div>

            <div className="viewerRight">

              <div className="pointRouge" />

              <div className="viewerCount">{stream.viewer_count}</div>

            </div>

            <div className="gameNameSideBar">{stream.gameName}</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
