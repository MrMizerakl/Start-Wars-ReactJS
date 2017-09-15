import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";

import styles from './loader.scss';

const propTypes = {
  active: PropTypes.bool
};

const defaultProps = {
  active: false
};

const Loader = () => {
  console.log('Loader', this.props);
  return (
    <div className={ defaultProps.active ? styles['loader-wrapper'] : 'hidden' }>
      <div className={ styles.loader } />
    </div>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

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
