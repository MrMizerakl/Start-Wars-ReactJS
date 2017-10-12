import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { bindActionCreators } from 'redux';
import { showLoader, hideLoader } from "./../../actions/loader";
import { updateSearchQuery, updateSearchType, fetchSwapiTypes } from './../../actions/search';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import Heading from 'grommet/components/Heading';
import Actions from 'grommet/components/icons/base/Menu';

class SearchHeader extends Component {
  constructor(...arg){
    super(...arg);

    this.createMenu = this.createMenu.bind(this);
    // this.search = this.search.bind(this);
    this.onHeaderSearch = this.onHeaderSearch.bind(this);
  }

  componentWillMount(){
    this.props.actions.fetchSwapiTypes();
  }

  onHeaderSearch(e){
    this.search(e.target.value)
  }

  setCurrentResourceType(type) {
    if (!type) return;
    const { query } = this.props.search;
    this.props.actions.updateSearchType({ type });
    this.props.history.replace(`/search/${type}/${query || ' '}`);
    // this.props.onResult(type, query || ' ');
  }

  getCurrentResourceType(){
    const { type, types } = this.props.search;
    return type || types[0] || '';
  }

  search(searchQuery) {
    const type = this.getCurrentResourceType();
    if (!type) return;
    this.props.actions.updateSearchQuery({query: searchQuery || ' '});
    this.props.history.replace(`/search/${type}/${searchQuery || ' '}`);
//       this.props.onResult(type, searchQuery || ' ');
  }

  createMenu( ) {
    const { types, error } = this.props.search;
    return (error ? <Heading tag='h4'>{error}</Heading> : types.map(
      elm => <Anchor
        key={elm}
        className='swapi-menu-item'
        onClick={() => this.setCurrentResourceType(elm)}>
        { elm }
      </Anchor>));
  }

  render (){
    return (
      <Header>
        <Box flex={true}
             justify='end'
             pad='small'
             direction='row'
             responsive={false}>
          <Anchor label='Label'
                  animateIcon={false}
                  primary={false}
                  reverse={false}
                  disabled={false}
                  path={{ path: '/', index: true }}
                  target='_blank'>
            <Heading tag='h2'
                     strong={true}
                     uppercase={true}
                     truncate={true}
                     margin='none'>
              SWAPI
            </Heading>
          </Anchor>
          <Search inline={true}
                  fill={true}
                  size='medium'
                  placeHolder={`Search ${this.props.search.types[0]} `}
                  dropAlign={{"right": "right"}}
                  onDOMChange={this.onHeaderSearch}
          />
          <Menu icon={ this.props.search.fetching ? <Spinning /> : <Actions /> }
                about="responsive={true}"
                dropAlign={{"right": "right"}}>
            { this.createMenu( ) }
          </Menu>
        </Box>
      </Header>
    );
  }
}

const mapStateToProps = ({repositories, loading, search}) => {
  return {
    repositories, loading, search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showLoader, hideLoader, updateSearchQuery, updateSearchType, fetchSwapiTypes }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHeader));