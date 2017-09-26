import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../../actions/loader";
import { personage } from './../../../actions/personage';

import Section from 'grommet/components/Section'
import Headline from 'grommet/components/Headline'
import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Image from 'grommet/components/Image'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Paragraph from 'grommet/components/Paragraph'

class Personage extends React.PureComponent {

  componentDidMount() {
    this.props.actions.personage();
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
    return <Section>
      <Headline strong={true}
                size='medium'
                align='center'>
        {this.props.repositories.resourceData.name}
      </Headline>
      <Columns  size='large' justify='center' >
        <Box align='center'
             pad='small'
             margin='none'>
          <Image src={ this.getImage(this.props.repositories.resourceData.name) }
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
                <span className='secondary'>{this.props.repositories.resourceData.height}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>mass</span>
                <span className='secondary'>{this.props.repositories.resourceData.mass}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>hair_color</span>
                <span className='secondary'>{this.props.repositories.resourceData.hair_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>skin_color</span>
                <span className='secondary'>{this.props.repositories.resourceData.skin_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>eye_color</span>
                <span className='secondary'>{this.props.repositories.resourceData.eye_color}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>birth_year</span>
                <span className='secondary'>{this.props.repositories.resourceData.birth_year}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>gender</span>
                <span className='secondary'>{this.props.repositories.resourceData.gender}</span>
              </ListItem>
              <ListItem justify='between' separator='horizontal'>
                <span>homeworld</span>
                <span className='secondary'>{this.props.repositories.resourceData.homeworld}</span>
              </ListItem>
            </List>
          </Section>
        </Box>
        <Tabs>
          <Tab title='films'>
            <Paragraph>films
              {/* this.props.repositories.resourceData.films.length()*/ }
            </Paragraph>
          </Tab>
          <Tab title='species'>
            <Paragraph>species
              { /*this.props.repositories.resourceData.species.length()*/ }
            </Paragraph>
          </Tab>
          <Tab title='vehicles'>
            <Paragraph>vehicles
              { /*this.props.repositories.resourceData.vehicles.length() */}
            </Paragraph>
          </Tab>
          <Tab title='starships'>
            <Paragraph>starships
              { /*this.props.repositories.resourceData.starships.length()*/ }
            </Paragraph>
          </Tab>
        </Tabs>
      </Columns>
    </Section>;
  }
}


const mapStateToProps = ({repositories, loading}) => {
  return {
    repositories, loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader,  personage }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Personage);
// export default Personage;
