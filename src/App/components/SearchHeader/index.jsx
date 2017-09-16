import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateSearchType } from './../../ducks/search';
import { updateSearchQuery } from './../../ducks/search';
import { fetchSwapiTypes } from './../../ducks/search';

import Header from '../../../common/components/Header';
import Heading from '../../../common/components/Heading';
import Search from '../../../common/components/Search';
import Menu from '../../../common/components/Menu';
import Anchor from '../../../common/components/Anchor';
import Spinning from '../../../common/components/Spinning';

import './index.scss';

const DELAY = 333;

class SearchHeader extends React.Component {
  constructor(...args) {
    super(...args);

    this.private = {
      throttleTimeout: -1,
    };

    this.onHeaderSearch = this.onHeaderSearch.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount', this.props.search);
    this.props.fetchSwapiTypes();
  }

  onHeaderSearch(e) {
    window.clearTimeout(this.private.throttleTimeout);

    this.private.throttleTimeout = window.setTimeout(() => this.search(e.target.value), DELAY);
  }

  setCurrentResourceType(type) {
    if (!type) return;
console.log('setCurrentResourceType',type);
    const { query } = this.props.search;
    this.props.updateSearchType({ type });
    this.props.history.replace(`/search/${type}/${query || ' '}`);

    this.props.onResult(type, query || ' ');
  }

  getCurrentResourceType(){
    const { type, types } = this.props.search;
    return type || types[0] || '';
  }

  get menu() {
    const { types, fetching, error } = this.props.search;

    return (<Menu>{ fetching ? <Spinning /> : null }
      {error ? <Heading tag='h4'>{error}</Heading> :
        types.map(
          type => (
            <Anchor
              key={type}
              className="swapi-menu-item"
              label={type}
              onClick={
                () => this.setCurrentResourceType(type)
              }
            >
              <Heading tag="h4">
                {type}
              </Heading>
            </Anchor>
          ),
        )}
      </Menu>);
  }

  search(searchQuery) {
    const type = this.getCurrentResourceType();

    if (!type) return;

    this.props.updateSearchQuery({query: searchQuery || ' '});
    this.props.history.replace(`/search/${type}/${searchQuery || ' '}`);

    this.props.onResult(type, searchQuery || ' ');
  }

  render() {
    return (
      <Header className="swapi-search-header">
        <Anchor path={{ path: '/', index: true }}>
          <Heading>
            SWAPI
          </Heading>
        </Anchor>
        <Search
          placeHolder={`Embrace the world of Star Wars! Search for ${this.props.search.types[0]}...`}
          onDOMChange={this.onHeaderSearch}
        />
        {this.menu}
      </Header>
    );
  }
}

SearchHeader.propTypes = {
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
  onResult: PropTypes.func,
};

SearchHeader.defaultProps = {
  onResult() {},
};

const mapStateToProps = ({ search }) => ({
  search,
});

const mapDispatchToProps = dispatch => ({
  fetchSwapiTypes: payload => dispatch(fetchSwapiTypes(payload)),
  updateSearchType: payload => dispatch(updateSearchType(payload)),
  updateSearchQuery: payload => dispatch(updateSearchQuery(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHeader));
