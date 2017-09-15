import React from 'react';
import Typist from 'react-typist';

import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import srcImage1 from './assets/star-wars-anthology.jpg';
import srcImage2 from './assets/Anikin-Skywalker.jpg';

import 'react-typist/dist/Typist.css';

class Home extends React.PureComponent {
  render() {
    let srcImage = Math.round(Math.random()*100 +1) % 2 ? srcImage1 : srcImage2;
    return (
      <Hero
        size='large'
        background={
          <Image src={srcImage}
          fit='cover'
          full={true}
          align={{"top": true}}
          />
        }
        backgroundColorIndex='dark'>
        <Heading margin='large' uppercase={true} align='start'>
            <Headline strong={true}
                      size='large'>
              <Typist avgTypingDelay={100}>
                  May the Force be with you...
              </Typist>
            </Headline>
        </Heading>
      </Hero>
    );
  }
}

export default Home;
