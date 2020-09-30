import regeneratorRuntime from 'regenerator-runtime';

import React, { useEffect, useState } from 'react';
import api from 'src/api';
import './games.scss';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top');
      console.log(result);

      const arrayData = result.data.data;
      const finalArray = arrayData.map((game) => {
        const newUrl = game.box_art_url
          .replace('{width}', '250')
          .replace('{height}', '300');
        game.box_art_url = newUrl;
        return game;
      });

      setGames(finalArray);
    };
    fetchData();
  }, []);
  console.log(games);

  return (
    <div>

      <h1 className="titreGames">Jeux les plus populaires</h1>

      <div className="flexAccueil">

        {games.map((game, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="carteGames">
            <img src={game.box_art_url} alt="Jeux profil pic" className="imageCarte" />
            <div className="cardBodyGames">
              <h5 className="titreCartesGames">{game.name}</h5>
              <div className="btnCarte">Regarder {game.name}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Games;
