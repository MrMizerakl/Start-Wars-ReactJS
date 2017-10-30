import { LOADEDPAGE, PERSONAGE, UPDATE_SEARCH_PARAMETERS } from './../constants';
import { hideLoader, showLoader } from "./loader";
import {LOADING} from "../constants/index";

export const updateSearchParameters = ({ parameters }) => {
  return {
    repositories: {
      parameters,
    },
    type: UPDATE_SEARCH_PARAMETERS,
  };
};

export const startLoading = () => {
  return {
    type: LOADING,
    repositories: {
      resourceData: []
    }
  }
};

export const personage = () => {
  return (dispatch, getState) => {
    dispatch(showLoader());
    dispatch(startLoading());

    let data = getState(), parameters = data.repositories.parameters;
    const url = `https://swapi.co/api/${parameters.resource}/${parameters.id}`;
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json,
              arrPromise = [];
        if(resourceData.homeworld){
          arrPromise.push( fetch( resourceData.homeworld ) );
        }
        if(resourceData.films.length){
          arrPromise.push(...resourceData.films.map( elm => fetch( elm ) ));
        }
        if(resourceData.species.length){
          arrPromise.push(...resourceData.species.map( elm => fetch( elm ) ));
        }
        if(resourceData.vehicles.length){
          arrPromise.push(...resourceData.vehicles.map( elm => fetch( elm ) ));
        }
        if(resourceData.starships.length){
          arrPromise.push(...resourceData.starships.map( elm => fetch( elm ) ));
        }
        Promise.all( arrPromise )
          .then( response => {
            const results = response.map( item => item.json() );
            Promise.all( results ).then( result => {

              const infoData = result.map( item => {
                return {
                  'name' : item.name || item.title,
                  'episode' : item.episode_id || null,
                  'id' : item.url.match(/\d+/g)[0],
                  'type' : item.url.match(/\w+/g)[4]
                };
              });
              dispatch(hideLoader());
              return dispatch({
                type: LOADEDPAGE,
                repositories: {
                  category: PERSONAGE,
                  parameters,
                  resourceData: Object.assign(
                    {},
                    resourceData,
                    { infoData })
                }
              });
            }).catch(function (error) {
              console.log('Error promise all, 2 lev.: ', error);
            })
          }).catch(function (error) {
            console.log('Error promise all, 1 lev.: ', error);
        })

      }).catch(function(error){
        console.log('personage return personage error');
        console.log('action-personage-all', error)
      });
  }
};