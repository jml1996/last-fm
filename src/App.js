import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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
			<Route exact path="/" component={Artists}>
				<Redirect to="/artists" />
			</Route>
			<Route exact path="/artists" component={Artists} />
			<Route exact path="/artistdetails/:id/" component={ArtistDetails} />
			</Switch>
		</Router>
    </div>
  );
}

export default App;
