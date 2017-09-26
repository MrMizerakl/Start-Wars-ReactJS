import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";

import './loader.scss';

class Loader extends Component {
  render () {
    return (
      <div className={ this.props.loader.loading ? 'loader-wrapper' : 'hidden' }>
        <div className={ this.props.loader.loading ? 'loader' : 'hidden' } />
      </div>
    )
  };
}

const mapStateToProps = ({ loader }) => {
  return {
    loader
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
//export default Loader;
