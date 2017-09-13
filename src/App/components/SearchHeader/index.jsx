import React, {Component} from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import Heading from 'grommet/components/Heading';
import Actions from 'grommet/components/icons/base/Menu';
import { withRouter } from 'react-router-dom';

class SearchHeader extends Component {
  constructor(...arg){
    super(...arg);

    this.state = {
        searchType: '',
        searchData: ' ',
        resourceTypes: []
    };

  this.setSearchType = this.setSearchType.bind(this);
  this.setHistory = this.setHistory.bind(this);
  }

  componentWillMount(){
      window
          .fetch('http://swapi.co/api/')
          .then( res => res.json() )
          .then(
              json => {this.setState({ resourceTypes: Object.keys(json) });
                  this.setState({ searchType: Object.keys(json)[0] })
              });
  }

  createMenu( arr ) {
      return arr.map(
          elm => <Anchor
                    key={elm}
                    className='swapi-menu-item'
                    onClick={() => this.setSearchType( elm ) }>
              {elm}
          </Anchor>);
  }

  setSearchType( e ) {
    this.setState({ searchType: e }, this.setHistory );
  }

  setHistory(){
      this.props.history.replace( `/search/${this.state.searchType}/${this.state.searchData || ' '}`);
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
                      path='/'
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
                      placeHolder={`Search ${this.state.searchType} `}
                      dropAlign={{"right": "right"}}
                      onDOMChange={
                        (e) => {
                          this.setState( {searchData: e.target.value} , this.setHistory )
                        }
                      }
              />
              <Menu icon={<Actions />} about=" responsive={true}"
                    dropAlign={{"right": "right"}}>
                  {this.createMenu( this.state.resourceTypes )}
              </Menu>
          </Box>
      </Header>
  );
  }
}

export default withRouter(SearchHeader);