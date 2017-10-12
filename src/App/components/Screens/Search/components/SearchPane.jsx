import React from 'react';

import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';

class SearchPane extends React.Component {

  get Image( ){
    let img;
    try {
      img = require(`./../../../assets/${this.props.data.name}.jpg`);
    } catch(e){
      img = require(`./../../../assets/StarWars.jpg`);
    }
    return img;
  }

  render() {
    const { data } = this.props;
    return (
      <Tile key={ data.name}>
        <Card thumbnail={ this.Image(data.name) }
              heading={data.name || data.title}
              key={data.name || data.title}
              link={
                <Anchor
                  href=''
                  label='Detail...' />
              }
        />
      </Tile>
    );
  }
}

export default SearchPane;