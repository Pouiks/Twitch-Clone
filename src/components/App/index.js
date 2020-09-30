// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import SideBar from 'src/components/SideBar';
import Games from 'src/components/Games';
import './styles.css';

// == Composant
const App = () => {
  return(
  <div className="app">
    <Header />
    <SideBar />
    <Games />
  </div>
  )
};

// == Export
export default App;
