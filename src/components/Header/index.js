import React from 'react';
import logo from 'src/components/Header/IconTwitch.svg';
import search from 'src/components/Header/Search.svg';
import menuIco from 'src/components/Header/MenuIco.svg';
import { Link } from "react-router-dom";

import './header.scss';

const Header = () => (

  <div>

    <nav className="headerTop">

      <ul className="listeMenu">

        <li className="liensNav">
        <Link className="lien" to="/">
          <img src={logo} alt="logo twitch" className="logo" />
        </Link>
        </li>
        <li className="liensNav">
        <Link className="lien" to="/">
          TopGames
        </Link>
        </li>
        <li className="liensNav">
        <Link className="lien" to="/top-streams">
          Top Streams
        </Link>
        </li>
        <li className="liensNav">
          <form className="formSubmit">

            <input type="text" name="" id="" className="inputRecherche" />
            <button type="submit">
              <img src={search} alt="icone loupe" className="logoLoupe" />
            </button>

          </form>
        </li>

      </ul>

    </nav>

    <div className="menuResBut">
      <img src={menuIco} alt="icone du menu" className="menuIco" />
    </div>

  </div>
);

export default Header;
