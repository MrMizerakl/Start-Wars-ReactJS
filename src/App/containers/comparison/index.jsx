import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppPage from 'grommet/components/App';
import Article from 'grommet/components/Article';
import 'grommet/scss/vanilla/index.scss';
import SearchHeader from './../../components/SearchHeader';
import PageFooter from './../../components/PageFooter';
import PageRouter from './../../components/PageRouter';

class Comparison extends Component {
  render(){
    return (
      <AppPage centered={false}>
        <Article>
          <SearchHeader />
          <PageRouter />
          <PageFooter />
        </Article>
      </AppPage>
    )
  }
}

export default Comparison;

/*
const mapStateToProps = ({repositories, loader, loaded}) => {
  return {
    // repositories,
    // loader,
    // loaded
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // actions: bindActionCreators({load, showLoader, hideLoader, doLoad}, dispatch),
    // showLoader: () => dispatch(showLoader),
    // hideLoader: () => dispatch(hideLoader)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);
// export default Comparison;

*/