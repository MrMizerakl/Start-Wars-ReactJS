import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import AppPage from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Loader from './../../components/loader';
import SearchHeader from './../../components/SearchHeader';
import PageFooter from './../../components/PageFooter';
import PageRouter from './../../components/PageRouter';
import 'grommet/scss/vanilla/index.scss';

import { showLoader, hideLoader } from "./../../actions/loader";
import { people } from './../../actions/people';
import { films } from './../../actions/films';
import { planets } from './../../actions/planets';
import { species } from './../../actions/species';
import { vehicles } from './../../actions/vehicles';
import { starships } from './../../actions/starships';

class Comparison extends Component {
  render(){
    return (
      <BrowserRouter>
        <AppPage centered={false}>
          <Article>
            <Loader />
            <SearchHeader />
            <PageRouter />
            <PageFooter />
          </Article>
        </AppPage>
      </BrowserRouter>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);
// export default Comparison;