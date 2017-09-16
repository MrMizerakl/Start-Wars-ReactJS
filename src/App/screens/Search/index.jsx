import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchSwapi, doLoadSwapi } from '../../ducks/searchResults';

import SearchPane from './components/SearchPane';
import Section from '../../../common/components/Section';
import Tiles from '../../../common/components/Tiles';
import Meter from '../../../common/components/Meter';
import Box from '../../../common/components/Box';
import Value from '../../../common/components/Value';
import Headline from '../../../common/components/Headline';
import ListPlaceholder from '../../../common/components/ListPlaceholder';

class Search extends React.Component {
  componentDidMount() {
    this.props.searchSwapi();
  }

  componentWillReceiveProps(nextProps) {
    const { type, query } = this.props.search;

    if( nextProps.search.type !== type || nextProps.search.query !== query ){
      this.props.searchSwapi();
    }
  }

  get searchTiles() {
    const { type } = this.props.search;
    const { results, count , next } = this.props.searchResults;
    return (
      <Tiles fill onMore={ results.length < count ? this.props.doLoadSwapi : null }>
        {
          results.map(
            item => <SearchPane key={item.url} type={type} data={item} />,
          )
        }
      </Tiles>
    );
  }

  get placeHolder() {
    const { type, query } = this.props.search;
    const { fetching } = this.props.searchResults;

    return fetching ?
      <ListPlaceholder /> :
      <Headline align="center">
        {`Cannot find "${query}" in ${type} collection. :(`}
      </Headline>;
  }

  get meter() {
    const { type } = this.props.search;
    const { results, count } = this.props.searchResults;

    return count ? (
      <Box align="center">
        <Meter value={(results.length * 100) / count} />
        <Value
          value={results.length}
          units={type}
          align="center"
        />
      </Box>
    ) : null;
  }

  render() {
    const { count } = this.props.searchResults;

    return (
      <Section>
        <Box align="center">
          { count ? this.searchTiles : this.placeHolder }
        </Box>
        {this.meter}
      </Section>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = ({ search, searchResults }) => ({
  search,
  searchResults
});

const mapDispatchToProps = dispatch => ({
  searchSwapi: payload => dispatch(searchSwapi(payload)),
  doLoadSwapi: payload => dispatch(doLoadSwapi(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);