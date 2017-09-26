import React, { Component } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import { withRouter } from 'react-router';

class Search extends Component {
  constructor(...arg){
    super(...arg);

    this.state = {
      searchType: this.props.match.params.type,
      searchData: this.props.match.params.query,
      searchResult: {},
      countLoad: 0
    };

    this.getDataSWAPI = this.getDataSWAPI.bind(this);
    this.loadDataSWAPI = this.loadDataSWAPI.bind(this);
  }

  componentDidMount( ){
     this.getDataSWAPI(this.state.searchType, this.state.searchData);
 }

  componentWillReceiveProps( newProps ){
    this.setState({
        searchType: newProps.match.params.type,
        searchData: newProps.match.params.query},
        this.getDataSWAPI
    );
  }

  getDataSWAPI() {
    let searchType = this.state.searchType,
        searchData = this.state.searchData;
    window
      .fetch(`https://swapi.co/api/${searchType}/?search=${searchData}`)
      .then( res => res.json() )
      .then(
        json => {this.setState({
          searchResult: json,
          countLoad: json.results.length
        });
        }
      );
  }

  loadDataSWAPI(){
    if (this.state.searchResult.next) {
      window
        .fetch(this.state.searchResult.next)
        .then( res => res.json() )
        .then(
        json => {
            this.setState({
                searchResult: {
                    count: json.count,
                    next: json.next,
                    previous: json.previous,
                    results: this.state.searchResult.results.concat( json.results )
                },
                countLoad: this.state.countLoad + json.results.length
            });
            if ( !json.next ){
                // removeEventListener('onMore', this);
            }
        }
      );
    }
  }

  getValueCount(){
    return `Loaded ${this.state.countLoad} of ${this.state.searchResult.count} records.`;
  }

  getValueAll(){
    return `Found ${this.state.searchResult.count} records.`;
  }

  getImage( arg ){
    let img;
    try {
      img = require(`./../../assets/${arg}.jpg`);
    } catch(e){
      img = require(`./../../assets/StarWars.jpg`);
    }
    return img;
  }

  render(){
      return this.state.searchResult.count ? <Section>
        <Value value={this.getValueAll()} align='end' size='small' />
        <br />
        <Tiles fill={true} onMore={ this.loadDataSWAPI } >
          {this.state.searchResult.results.map(
            item => <Tile key={item.name}>
              <Card thumbnail={ this.getImage(item.name) }
                heading={item.name || item.title}
                key={item.name || item.title}
                link={
                  <Anchor
                    href=''
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
                 max={this.state.searchResult.count}/>
        </Box>
      </Section> : <Section />;
  };
}
// this.getValueCount()
export default withRouter(Search);