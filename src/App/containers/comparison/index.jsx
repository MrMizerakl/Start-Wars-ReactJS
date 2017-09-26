import React, { Component } from 'react';

import AppPage from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Loader from './../../components/loader';
import SearchHeader from './../../components/SearchHeader';
import PageFooter from './../../components/PageFooter';
import PageRouter from './../../components/PageRouter';
import 'grommet/scss/vanilla/index.scss';

class Comparison extends Component {
  render(){
    return (
        <AppPage centered={false}>
          <Article>
            <Loader />
            <SearchHeader />
            <PageRouter />
            <PageFooter />
          </Article>
        </AppPage>
    );
  }
}

export default Comparison;