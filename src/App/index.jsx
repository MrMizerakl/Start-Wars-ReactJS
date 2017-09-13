import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AppPage from 'grommet/components/App';
import Article from 'grommet/components/Article';
import 'grommet/scss/vanilla/index.scss';
import 'whatwg-fetch';
import PageFooter from './components/PageFooter';
import Home from './screens/Home';
import Films from './screens/Films';
import People from './screens/People';
import Planets from './screens/Planets';
import Starships from './screens/Starships';
import Species from './screens/Species';
import Vehicles from './screens/Vehicles';
import Search from './screens/Search';
import SearchHeader from './components/SearchHeader';
import './index.scss';

// <Route path="/:errorpage" component={Errorpage} />

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <AppPage centered={false}>
          <Article>
            <SearchHeader />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route strict path="/search/:type/:query" component={Search} />
              <Route path="/films" component={Films} />
              <Route path="/people" component={People} />
              <Route path="/planets" component={Planets} />
              <Route path="/species" component={Species} />
              <Route path="/starships" component={Starships} />
              <Route path="/vehicles" component={Vehicles} />
              <Redirect to="/" />
            </Switch>
            <PageFooter />
          </Article>
        </AppPage>
      </BrowserRouter>
    );
  }
}

export default App;
