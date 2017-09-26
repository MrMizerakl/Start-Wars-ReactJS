import React from 'react';
import Value from 'grommet/components/Value';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';

import { withRouter } from 'react-router';

import StarWars from './../../assets/StarWars.jpg';

class Vehicles extends React.PureComponent {
  constructor(...arg){
    super(...arg);

    this.state = {
      resourceData: {},
      countLoad: 0
    }

    this.getImage = this.getImage.bind(this);
    this.getValueAll = this.getValueAll.bind(this);
    this.getValueCount = this.getValueCount.bind(this);
    this.loadDataSWAPI = this.loadDataSWAPI.bind(this);
  }

  componentDidMount(){
    window
        .fetch(`https://swapi.co/api/vehicles`)
        .then( res => res.json() )
        .then( json => this.setState({resourceData: json, countLoad: json.results.length}) )
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
      // case 'AnakinSkywalker': return AnakinSkywalker;
      // case 'BeruWhitesunlars': return BeruWhitesunlars;
      // case 'BiggsDarklighter': return BiggsDarklighter;
      // case 'C3PO': return C3PO;
      // case 'Chewbacca': return Chewbacca;
      // case 'DarthVader': return DarthVader;
      // case 'HanSolo': return HanSolo;
      // case 'LeiaOrgana': return LeiaOrgana;
      // case 'LukeSkywalker': return LukeSkywalker;
      // case 'ObiWanKenobi': return ObiWanKenobi;
      // case 'OwenLars': return OwenLars;
      // case 'R2D2': return R2D2;
      // case 'R5D4': return R5D4;
      // case 'WilhuffTarkin': return WilhuffTarkin;
    }
    return StarWars ;
  }

  render(){
    return this.state.resourceData.count ? <Section>
      <Value value={this.getValueAll()} align='end' size='small' />
      <br />
      <Tiles fill={true} onMore={this.state.resourceData.count!==this.state.countLoad ? this.loadDataSWAPI : null  } >
        {this.state.resourceData.results.map(
            item => <Tile key={item.name}>
              <Card thumbnail={ this.getImage(item.name) }
                    heading={item.name}
                    key={item.name}
                    link={<Anchor href='#'
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

export default withRouter(Vehicles);
