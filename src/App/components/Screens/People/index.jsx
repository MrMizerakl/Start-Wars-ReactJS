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

import { withRouter } from 'react-router-dom';

import { StarWars, AnakinSkywalker, BeruWhitesunlars, BiggsDarklighter,
  C3PO, Chewbacca, DarthVader, HanSolo, LeiaOrgana, LukeSkywalker, ObiWanKenobi,
  OwenLars, R2D2, R5D4, WilhuffTarkin } from './assets';

class People extends React.PureComponent {
  constructor(...arg){
    super(...arg);
    
    this.state = {
      searchData: 0,
      resourceData: {},
      countLoad: 0,
      peopleData: {},
      planetData: {}
    };

    this.getImage = this.getImage.bind(this);
    this.getValueAll = this.getValueAll.bind(this);
    this.getValueCount = this.getValueCount.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.loadDataSWAPI = this.loadDataSWAPI.bind(this);
    this.loadPeopleDataSWAPI = this.loadPeopleDataSWAPI.bind(this);
  }

  componentDidMount(){
    window
      .fetch(`https://swapi.co/api/people`)
      .then( res => res.json() )
      .then( json => this.setState({resourceData: json, countLoad: json.results.length}) )
  }

  componentWillReceiveProps( newProps ){
    if( newProps.location.pathname == '/people' ){
      this.setState({searchData:0});
      this.setState({peopleData: {}});
      this.setState({planetData: {}});
    } else {
      let url = newProps.location.pathname;
      this.setState({searchData: url.substr(8)}, this.loadPeopleDataSWAPI );
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
      case 'AnakinSkywalker': return AnakinSkywalker;
      case 'BeruWhitesunlars': return BeruWhitesunlars;
      case 'BiggsDarklighter': return BiggsDarklighter;
      case 'C3PO': return C3PO;
      case 'Chewbacca': return Chewbacca;
      case 'DarthVader': return DarthVader;
      case 'HanSolo': return HanSolo;
      case 'LeiaOrgana': return LeiaOrgana;
      case 'LukeSkywalker': return LukeSkywalker;
      case 'ObiWanKenobi': return ObiWanKenobi;
      case 'OwenLars': return OwenLars;
      case 'R2D2': return R2D2;
      case 'R5D4': return R5D4;
      case 'WilhuffTarkin': return WilhuffTarkin;
    }
    return StarWars ;
  }

  getUrl( arg ){
    return arg.replace('https://swapi.co/api','').substr(8, arg.length-29);
  }

  setUrl( arg ){
    this.setState({searchData: arg}, this.loadPeopleDataSWAPI );
  }

  loadPeopleDataSWAPI(){
    window
        .fetch(`https://swapi.co/api/people/${this.state.searchData}`)
        .then( res => res.json() )
        .then( json => this.setState({peopleData: json}, this.loadNameWithUrl ) )
  }

  loadNameWithUrl(){
    window
        .fetch( this.state.peopleData.homeworld )
        .then( res => res.json() )
        .then( json => this.setState({ planetData: json }) )
  }

  render(){
    return this.state.searchData > 0 && this.state.peopleData.name && this.state.planetData.name ? <Section>
      <Headline strong={true}
                size='medium'
                align='center'>
        {this.state.peopleData.name}
      </Headline>
      <Columns  size='large' justify='center' >
        <Box align='center'
             pad='small'
             margin='none'>
          <Image src={this.getImage(this.state.peopleData.name)}
                 size='large'
                 full='vertical' />
        </Box>
        <Box align='stretch'
             pad='none'
             margin='none'>
          <Section>
            <List selectable={true} >
              <ListItem justify='between' separator='horizontal'>
                <span>height</span>
                <span className='secondary'>{this.state.peopleData.height}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>mass</span>
                <span className='secondary'>{this.state.peopleData.mass}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>hair_color</span>
                <span className='secondary'>{this.state.peopleData.hair_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>skin_color</span>
                <span className='secondary'>{this.state.peopleData.skin_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>eye_color</span>
                <span className='secondary'>{this.state.peopleData.eye_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>birth_year</span>
                <span className='secondary'>{this.state.peopleData.birth_year}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>gender</span>
                <span className='secondary'>{this.state.peopleData.gender}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>homeworld</span>
                <span className='secondary'>{this.state.planetData.name}</span>
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
                                path={ `/people/${this.getUrl(item.url)}` }
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

export default withRouter(People);
