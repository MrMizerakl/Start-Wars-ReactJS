import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Films from './screens/Films';
import People from './screens/People';
import Planets from './screens/Planets';
import Starships from './screens/Starships';
import Species from './screens/Species';
import Vehicles from './screens/Vehicles';
import Search from './screens/Search';
import SearchHeader from './components/SearchHeader';

import AppPage from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import 'whatwg-fetch';

import './index.scss';
import 'grommet/scss/vanilla/index.scss';

// <Route path="/:errorpage" component={Errorpage} />

class App extends React.PureComponent {
    
  constructor(...arg){
    super(...arg);  
    
    this.state = {
      resourceTypes: []
    };

    this.createMenuFooter = this.createMenuFooter.bind(this);
    this.setPath = this.setPath.bind(this);
  }

  componentWillMount(){
    window
      .fetch('http://swapi.co/api/')
      .then( res => res.json() )
      .then( json => this.setState({ resourceTypes: Object.keys(json) }) )
  }

  createMenuFooter(arr){
    return arr.map( item => <Anchor
                                key={item}
                                path={ this.setPath( item ) }>
                                {item[0].toUpperCase()}{item.substring(1)}
                            </Anchor>
    );
  }


  setPath( item ){
    return `/${item}`;
  }

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
          </Article>
            <Footer justify='between'
                    pad='small' >
                <Title>
                    SWAPI
                </Title>
                <Box direction='row'
                     align='center'
                     pad={{"between": "medium"}}>
                    <Paragraph margin='none'>
                        mrMizerakl © 2016
                    </Paragraph>
                    <Menu direction='row'
                          size='small'
                          dropAlign={{"right": "right"}}>
                        <Anchor
                            key='footerhome'
                            path='/'>
                            Home
                        </Anchor>
                        { this.createMenuFooter(this.state.resourceTypes) }
                    </Menu>
                </Box>
            </Footer>
        </AppPage>
      </BrowserRouter>
    );
  }
}

export default App;
