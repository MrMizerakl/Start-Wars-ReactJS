import React from 'react';
import Typist from 'react-typist';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { homepage } from './../../../actions/homepage';
import { showLoader, hideLoader } from "./../../../actions/loader";

import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import srcImage1 from './../../assets/Home1.jpg';
import srcImage2 from './../../assets/Home2.jpg';

import 'react-typist/dist/Typist.css';

class Home extends React.PureComponent {
  render() {
    const srcImage = Math.round(Math.random()*100 +1) % 2 ? srcImage1 : srcImage2;
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

const mapStateToProps = ({repositories, loading}) => {
  return {
    repositories, loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader, homepage }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
