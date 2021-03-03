import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Artists from "./components/Artists";
import NavBar from './components/NavBar';
import ArtistDetails from "./components/ArtistDetails"
import history from "./history";

function App() {
  return (
    <div>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/artists" component={Artists} />
          <Route path="/artist/:id" component={ArtistDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
