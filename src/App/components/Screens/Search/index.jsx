import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { searchSwapi, doLoadSwapi } from './../../../actions/searchresult';

import SearchPane from './components/SearchPane';
import Tiles from 'grommet/components/Tiles';
import Section from 'grommet/components/Section';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';

class Search extends Component {
  componentDidMount( ){
    this.props.actions.searchSwapi();
 }

  componentWillReceiveProps( newProps ){
    const { type, query } = this.props.search;

    if( newProps.search.type !== type || newProps.search.query !== query ){
      this.props.actions.searchSwapi();
    }
  }

  get valueCount(){
    const { results, count } = this.props.searchResults;
    return `Loaded ${results.length} of ${count} records.`;
  }

  get valueAll(){
    const { count } = this.props.searchResults;
    return `Found ${count} records.`;
  }

  get searchTiles (){
    const { results, fetching, count } = this.props.searchResults;

    return (
      <Tiles fill onMore={ !fetching && results.length < count ? this.actions.doLoadSwapi() : null} >
        { results.map(item => <SearchPane key={item.name} data={item}/>) }
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
    const { count } = this.props.searchResult;
    return (
      <Box align='center'>
        <Value value={this.valueCount}  size='small' />
        <Meter vertical={false}
               value={this.state.countLoad}
               max={count}/>
      </Box>
    );
  }

  render(){
    const { count } = this.props.searchResults;

    return count ? <Section>
      <Value value={this.valueAll} align='end' size='small' />
      <br />
      { count ? this.searchTiles : this.placeHolder }
      {this.meter}
    </Section> : <Section />;
  };
}

const mapStateToProps = ({ search, searchResults }) => ({
  search,
  searchResults
});

const mapDispatchToProps = dispatch => ({
  searchSwapi: payload => dispatch(searchSwapi(payload)),
  doLoadSwapi: payload => dispatch(doLoadSwapi(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));