import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";

import styles from './loader.scss';

class Loader extends Component {
  // constructor(...args){
  //   super(...args);
  //
  //   this.propTypes = {
  //     active: PropTypes.bool
  //   };
  //
  //   this.defaultProps = {
  //     active: false
  //   };
  //
  // }

  render () {
    console.log('Loader', this.props);
    return (
      <div className={ this.props.loading ? styles['loader-wrapper'] : 'hidden' }>
        <div className={ styles.loader } />
      </div>
    )
  };
}

const mapStateToProps = ({ loading }) => {
  return {
    loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
//export default Loader;
