import React, {Component} from 'react';

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
    // this.setPath = this.setPath.bind(this);
  }

  componentWillMount(){
    window
      .fetch('http://swapi.co/api/')
      .then( res => res.json() )
      .then( json => this.setState({ resourceTypes: Object.keys(json) }) )
  }

  createMenuFooter(arr){
    return arr.map( item => <Anchor
        key={item}
        path={ `/${item}` }>
        {item[0].toUpperCase()}{item.substring(1)}
      </Anchor>
    );
  }

  // setPath( item ){
  //   return `/${item}`;
  // }

  render () {
    return (
      <Footer justify='between' pad='small' >
        <Title>
          SWAPI
        </Title>
        <Box direction='row'
             align='center'
             pad={{"between": "medium"}}>
          <Paragraph margin='none'>
            mrMizerakl © 2016
          </Paragraph>
          <Menu direction='row'
                size='small'
                dropAlign={{"right": "right"}}>
            <Anchor
              key='footerhome'
              path='/'>
              Home
            </Anchor>
            { this.createMenuFooter(this.state.resourceTypes) }
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default PageFooter;
