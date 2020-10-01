// == Import npm
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// == Import
import Header from 'src/components/Header';
import SideBar from 'src/components/SideBar';
import Games from 'src/components/Games';
import TopStreams from 'src/components/TopStreams';
import Live from 'src/components/Live';
import GameStreams from 'src/components/GameStreams';

import './styles.css';

// == Composant
const App = () => (
  <Router>

    <div className="app">
      <Header />
      <SideBar />

      <Switch>
        <Route exact path="/" component={Games} />
        <Route exact path="/top-streams" component={TopStreams} />
        <Route exact path="/live/:slug" component={Live} />
        <Route exact path="/game/:slug" component={GameStreams} />
      </Switch>

    </div>
  </Router>
);

// == Export
export default App;
