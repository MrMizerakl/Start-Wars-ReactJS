import React from 'react';
import Section from 'grommet/components/Section'
import Headline from 'grommet/components/Headline'
import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Image from 'grommet/components/Image'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'

import { withRouter } from 'react-router-dom';

import { StarWars, AnakinSkywalker, BeruWhitesunlars, BiggsDarklighter,
  C3PO, Chewbacca, DarthVader, HanSolo, LeiaOrgana, LukeSkywalker, ObiWanKenobi,
  OwenLars, R2D2, R5D4, WilhuffTarkin } from './assets';

class Personage extends React.PureComponent {

  render(){
    return <Section>
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
    </Section>;
  }
}

export default withRouter(Personage);