import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";
import { people } from './../../actions/people';
import { films } from './../../actions/films';
import { planets } from './../../actions/planets';
import { species } from './../../actions/species';
import { vehicles } from './../../actions/vehicles';
import { starships } from './../../actions/starships';

import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

class PageFooter extends Component {

  constructor(...args){
    super(...args);

    this.state = {
      resourceTypes: []
    };

    this.createMenuFooter = this.createMenuFooter.bind(this);
    this.createOnClick = this.createOnClick.bind(this);
  }

  componentWillMount(){
    window
      .fetch('http://swapi.co/api/')
      .then( res => res.json() )
      .then( json => this.setState({ resourceTypes: Object.keys(json) }) )
  }

  createOnClick( category ){
    // console.log('createOnClick', this.props);
    switch ( category ){
      case('people'): return this.props.actions.people;
      case('planets'): return this.props.actions.planets;
      case('films'): return this.props.actions.films;
      case('species'): return this.props.actions.species;
      case('vehicles'): return this.props.actions.vehicles;
      case('starships'): return this.props.actions.starships;
    }
  }

  createMenuFooter(){
    // this.createOnClick({item})
    return this.state.resourceTypes.map( item => <Anchor
        key={item}
        onClick={ this.props.actions.people }
        path={ `/${item}` }>
        {item[0].toUpperCase()}{item.substring(1)}
      </Anchor>
    );
  }

  render () {
    return (
      <Footer justify='between' pad='small' >
        <Title>
          SWAPI
        </Title>
        <Box direction='row' align='center' pad={{"between": "medium"}}>
          <Paragraph margin='none'>
            mrMizerakl © 2016
          </Paragraph>
          <Menu direction='row' size='small' dropAlign={{"right": "right"}}>
            <Anchor key='footerhome' path='/'>Home</Anchor>
            <Anchor key='people' path='/people' onClick={this.props.actions.people}>People</Anchor>
            <Anchor key='planets' path='/planets' onClick={this.props.actions.planets}>Planets</Anchor>
            <Anchor key='films' path='/films' onClick={this.props.actions.films}>Films</Anchor>
            <Anchor key='species' path='/species' onClick={this.props.actions.species}>Species</Anchor>
            <Anchor key='vehicles' path='/vehicles' onClick={this.props.actions.vehicles}>Vehicles</Anchor>
            <Anchor key='starships' path='/starships' onClick={this.props.actions.starships}>Starships</Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

const mapStateToProps = ({type, category, repositories, loading}) => {
  return {
    type, category, repositories, loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader, people, films, planets, species, vehicles, starships }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);
// export default PageFooter;