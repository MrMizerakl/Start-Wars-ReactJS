import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../../actions/loader";
import { people } from './../../../actions/people';
import { updateSearchParameters } from './../../../actions/personage';

import Value from 'grommet/components/Value';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';

import { withRouter } from 'react-router';

class People extends React.PureComponent {
  constructor(...arg){
    super(...arg);
    
    this.getImage = this.getImage.bind(this);
    this.getValueAll = this.getValueAll.bind(this);
    this.getValueCount = this.getValueCount.bind(this);
    this.getUrl = this.getUrl.bind(this);
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
    this.props.actions.updateSearchParameters({ parameters: { resource:'people', id: id }});
    this.props.history.replace(`/people/${id || ' '}`);
  }

  render(){
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
  };
}

const mapStateToProps = ({repositories, loading}) => {
  return {
    repositories, loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader, people, updateSearchParameters }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(People));