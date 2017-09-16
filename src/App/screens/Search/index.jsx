import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchSwapi } from './../../ducks/searchResult';

import SearchPane from './components/SearchPane';
import Section from '../../../common/components/Section';
import Tiles from '../../../common/components/Tiles';
import Meter from '../../../common/components/Meter';
import Box from '../../../common/components/Box';
import Value from '../../../common/components/Value';
import Headline from '../../../common/components/Headline';
import ListPlaceholder from '../../../common/components/ListPlaceholder';

// isSearching: true,
// searchType: props.match.params.type,
// searchQuery: props.match.params.query,


class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchResult: {},
    };

    // this.onTilesMore = this.onMore.bind(this);
  }

  componentDidMount() {
    this.props.searchSwapi();
  }

  componentWillReceiveProps(nextProps) {
    const { type, query } = this.props.search;

    // this.onTilesMore = this.onMore.bind(this);

    if( nextProps.search.type !== type || nextProps.search.query !== query ){
      this.props.searchSwapi();
    }
  }

  onSearchResult(result) {
    if (!result.next) this.onTilesMore = null;

    this.setState({
      // isSearching: false,
      searchResult: result,
    });
  }

  // onMore() {
  //   this.searchMore(this.state.searchResult.next);
  // }
  //
  get searchTiles() {
    const { type } = this.props.search;
    const { results } = this.props.searchResult;

    return (
      <Tiles
        fill
        // onMore={this.onTilesMore}
      >
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
    const { fetching } = this.props.searchResult;

    return fetching ?
      <ListPlaceholder /> :
      <Headline align="center">
        {`Cannot find "${query}" in ${type} collection. :(`}
      </Headline>;
  }

  get meter() {
    const { fetching, type, results, count } = this.props.searchResult;

    return fetching ? (
      <Box align="center">
        <Meter value={(results.length * 100) / count} />
        <Value
          value={results.length}
          units={type}
          align="center"
        />
      </Box>
    ) :
      null;
  }

  search(type, query) {
    // window
    //   .fetch(`https://swapi.co/api/${type}/?search=${query}`)
    //   .then(res => res.json())
    //   .then(json => this.onSearchResult(json));
  }

  searchMore(nextUrl) {
    if (nextUrl && !this.state.isSearching) {
      this.setState({
        isSearching: true,
      }, () => {
        window
          .fetch(nextUrl)
          .then(res => res.json())
          .then((json) => {
            if (!json.next) this.onTilesMore = null;

            this.setState({
              isSearching: false,
              searchResult: {
                count: json.count,
                next: json.next,
                previous: json.previous,
                results: [...this.props.searchResult.results, ...json.results],
              },
            });
          });
      });
    }
  }

  render() {
    return (
      <Section>
        <Box align="center">
          {
            this.props.searchResult.count
              ? this.searchTiles
              : this.placeHolder
          }
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

const mapStateToProps = ({ search, searchResult }) => ({
  search,
  searchResult
});

const mapDispatchToProps = dispatch => ({
  searchSwapi: payload => dispatch(searchSwapi(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
