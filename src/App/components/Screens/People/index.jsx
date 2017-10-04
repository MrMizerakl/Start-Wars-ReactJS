import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { bindActionCreators } from 'redux';
import { people } from './../../../actions/people';
import { showLoader, hideLoader } from "./../../../actions/loader";
import { updateSearchParameters, startLoading } from './../../../actions/personage';

import Value from 'grommet/components/Value';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';

class People extends React.PureComponent {
  constructor(...arg){
    super(...arg);
    
    this.getValueAll = this.getValueAll.bind(this);
    this.getValueCount = this.getValueCount.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  getValueCount(){
    return `Loaded ${this.props.repositories.resourceData.length} of ${this.props.repositories.parameters.count} records.`;
  }

  getValueAll(){
    return `Found ${this.props.repositories.parameters.count} records.`;
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

  getUrl( arg ){
    return arg.replace('https://swapi.co/api','').substr(8, arg.length-29);
  }

  doOnClick( id ) {
    this.props.actions.startLoading();
    this.props.actions.updateSearchParameters({ parameters: { resource:'people', id: id }});
    this.props.actions.push(`/people/${id || ' '}`);
  }

  getPage(){
    return this.props.repositories.resourceData.length>0 ? <Section>
      <Value value={this.getValueAll()} align='end' size='small' />
      <br />
      <Tiles fill={true} onMore={this.props.repositories.resourceData.length<this.props.repositories.parameters.count ? this.props.actions.people : null  } >
        {this.props.repositories.resourceData.map(
          item => <Tile key={item.name}>
            <Card thumbnail={ this.getImage( item.name ) }
                  heading={item.name}
                  key={item.name}
                  link={<Anchor path={{ path: `/people/${this.getUrl(item.url)}`, index: true }}
                                onClick={
                                  () => { this.doOnClick( this.getUrl(item.url) ); }
                                }
                                label='Detail...' />
                  }
            />
          </Tile>
        )}
      </Tiles>
      <Box align='center'>
        <Value value={this.getValueCount()}  size='small' />
        <Meter vertical={false}
               value={this.props.repositories.resourceData.length}
               max={this.props.repositories.parameters.count}/>
      </Box>
    </Section> : <Section />;
  }

  render(){
    return this.getPage()
  };
}

const mapStateToProps = ({repositories, loading}) => {
  return {
    repositories, loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ startLoading, showLoader, hideLoader, people, updateSearchParameters, push }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(People);