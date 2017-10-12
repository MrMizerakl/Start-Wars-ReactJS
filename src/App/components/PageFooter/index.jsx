import React, {Component} from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";
import { homepage } from './../../actions/homepage';
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

  constructor(...args) {
    super(...args);

    this.copyrightYear = (new Date()).getUTCFullYear();

    this.onClickHome = this.onClickHome.bind(this);
  }

  onClickHome(event) {
    event.preventDefault();
    console.log('onClick function', this.props);
    this.props.actions.push('/');
  }

  render () {
    return (
      <Footer justify='between' pad='small' >
        <Title>
          SWAPI
        </Title>
        <Box direction='row' align='center' pad={{"between": "medium"}}>
          <Paragraph margin='none'>
            mrMizerakl © {this.copyrightYear}
          </Paragraph>
          <Menu direction='row' size='small' dropAlign={{"right": "right"}}>
            <Anchor key='homepage' path={{ path: '/', index: true }}  onClick={this.props.actions.homepage}>Home</Anchor>
            <Anchor key='people' path={{ path: '/people', index: true }} onClick={this.props.actions.people}>People</Anchor>
            <Anchor key='planets' path={{ path: '/planets', index: true }} onClick={this.props.actions.planets}>Planets</Anchor>
            <Anchor key='films' path={{ path: '/films', index: true }} onClick={this.props.actions.films}>Films</Anchor>
            <Anchor key='species' path={{ path: '/species', index: true }} onClick={this.props.actions.species}>Species</Anchor>
            <Anchor key='vehicles' path={{ path: '/vehicles', index: true }} onClick={this.props.actions.vehicles}>Vehicles</Anchor>
            <Anchor key='starships' path={{ path: '/starships', index: true }} onClick={this.props.actions.starships}>Starships</Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

const mapStateToProps = ({repositories, loader}) => {
  return {
    repositories, loader
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader, homepage, people, films, planets, species, vehicles, starships }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);