import React from 'react';
import Value from 'grommet/components/Value';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Headline from 'grommet/components/Headline';
import Image from 'grommet/components/Image';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Columns from 'grommet/components/Columns';
import Carousel from 'grommet/components/Carousel';

import { withRouter } from 'react-router-dom';

import StarWars from './assets/StarWars.jpg';
import Alderaan from './assets/Alderaan.jpg';
import Dagobah from './assets/Dagobah.jpg';
import Hoth from './assets/Hoth.jpg';
import YavinIV from './assets/YavinIV.jpg';
import Tatooine from './assets/Tatooine.jpg';

class Planets extends React.PureComponent {
  constructor(...arg){
    super(...arg);

    this.state = {
      searchData: 0,
      resourceData: {},
      countLoad: 0,
      planetData: {},
      residentsData: {}
    };

    this.getImage = this.getImage.bind(this);
    this.getValueAll = this.getValueAll.bind(this);
    this.getValueCount = this.getValueCount.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.loadDataSWAPI = this.loadDataSWAPI.bind(this);
    this.loadPlanetsDataSWAPI = this.loadPlanetsDataSWAPI.bind(this);
  }

  componentDidMount(){
    window
        .fetch(`https://swapi.co/api/planets`)
        .then( res => res.json() )
        .then( json => this.setState({resourceData: json, countLoad: json.results.length}) )
  }

  componentWillReceiveProps( newProps ){
    if( newProps.location.pathname == '/planets' ){
      this.setState({searchData:0});
      this.setState({residentsData: {}});
      this.setState({planetData: {}});
    } else {
      let url = newProps.location.pathname;
      this.setState({searchData: url.substr(9)}, this.loadPlanetsDataSWAPI );
    }
  }

  loadDataSWAPI(){
    if (this.state.resourceData.next) {
      window
          .fetch(this.state.resourceData.next)
          .then( res => res.json() )
          .then(
              json => {
                this.setState({
                  resourceData: {
                    count: json.count,
                    next: json.next,
                    previous: json.previous,
                    results: this.state.resourceData.results.concat( json.results )
                  },
                  countLoad: this.state.countLoad + json.results.length
                });

                console.log(json);
                if ( !json.next ){
// off onMore
                }
              }
          );
    }
  }

  getValueCount(){
    return `Loaded ${this.state.countLoad} of ${this.state.resourceData.count} records.`;
  }

  getValueAll(){
    return `Found ${this.state.resourceData.count} records.`;
  }

  getImage( arg ){
    let zn = arg.replace(/\s|-/g, '');
    switch (zn){
      case 'Alderaan': return Alderaan;
      case 'Dagobah': return Dagobah;
      case 'Hoth': return Hoth;
      case 'YavinIV': return YavinIV;
      case 'Tatooine': return Tatooine;
    }
    return StarWars ;
  }
// ???
  getUrl( arg ){
    return arg.replace('https://swapi.co/api','').substr(9, arg.length-30);
  }

  setUrl( arg ){
    console.log(arg);
    this.setState({searchData: arg}, this.loadPlanetsDataSWAPI ); //
  }

  loadPlanetsDataSWAPI(){
    window
        .fetch(`https://swapi.co/api/planets/${this.state.searchData}`)
        .then( res => res.json() )
        .then( json => this.setState({planetData: json} ) ) // , this.loadNameWithUrl
  }


  render(){
    return this.state.searchData > 0 && this.state.planetData.name ? <Section>
      <Headline strong={true}
                size='medium'>
        {this.state.planetData.name}
      </Headline>
      <Columns  size='large' justify='center' >
        <Box align='center'
             pad='small'
             margin='none'>
          <Image src={this.getImage(this.state.planetData.name)}
                 size='large'
                 full='vertical' />
        </Box>
        <Box align='stretch'
             pad='none'
             margin='none'>
          <Section>
            <List selectable={true} >
              <ListItem justify='between' separator='horizontal'>
                <span>rotation_period</span>
                <span className='secondary'>{this.state.planetData.rotation_period}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>diameter</span>
                <span className='secondary'>{this.state.planetData.diameter}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>climate</span>
                <span className='secondary'>{this.state.planetData.climate}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>gravity</span>
                <span className='secondary'>{this.state.planetData.gravity}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>terrain</span>
                <span className='secondary'>{this.state.planetData.terrain}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>surface_water</span>
                <span className='secondary'>{this.state.planetData.surface_water}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>population</span>
                <span className='secondary'>{this.state.planetData.population}</span>
              </ListItem>
            </List>
          </Section>
        </Box>
      </Columns>
    </Section> : this.state.resourceData.count ? <Section>
      <Value value={this.getValueAll()} align='end' size='small' />
      <br />
      <Tiles fill={true} onMore={ this.loadDataSWAPI } >
        {this.state.resourceData.results.map(
            item => <Tile key={item.name}>
              <Card thumbnail={ this.getImage(item.name) }
                    heading={item.name}
                    key={item.name}
                    link={<Anchor href='#'
                                  path={ `/planets/${this.getUrl(item.url)}` }
                                  onClick={ () => this.setUrl(this.getUrl(item.url)) }
                                  label='Detail...' />
                       }
              />
            </Tile>
        )}
      </Tiles>
      <Box align='center'>
        <Value value={this.getValueCount()}  size='small' />
        <Meter vertical={false}
               value={this.state.countLoad}
               max={this.state.resourceData.count}/>
      </Box>
    </Section> : <Section />;
  };

}

export default withRouter(Planets);
