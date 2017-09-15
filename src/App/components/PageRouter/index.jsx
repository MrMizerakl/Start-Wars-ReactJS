import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './../Screens/Home';
import Films from './../Screens/Films';
import People from './../Screens/People';
import Personage from './../Screens/People/personage';
import Planets from './../Screens/Planets';
import Starships from './../Screens/Starships';
import Species from './../Screens/Species';
import Vehicles from './../Screens/Vehicles';
import Search from './../Screens/Search';

// <Route path="/:errorpage" component={Errorpage} />

class PageRouter extends Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route strict path="/search/:type/:query" component={Search} />
        <Route path="/films" component={Films} />
        <Route path="/people" component={People} />
        <Route path="/people/:id" component={Personage} />
        <Route path="/planets" component={Planets} />
        <Route path="/species" component={Species} />
        <Route path="/starships" component={Starships} />
        <Route path="/vehicles" component={Vehicles} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default PageRouter;