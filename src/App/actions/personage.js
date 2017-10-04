import { LOADEDPAGE, PERSONAGE, UPDATE_SEARCH_PARAMETERS } from './../constants';
import { hideLoader, showLoader } from "./loader";
import {LOADING} from "../constants/index";

export function updateSearchParameters({ parameters }) {
  return {
    repositories: {
      parameters,
    },
    type: UPDATE_SEARCH_PARAMETERS,
  };
}

export const startLoading = () => {
  return {
    type: LOADING,
    repositories: {
      resourceData: []
    }
  }
};

function updateStore(dispatch, parameters, resourceData){
  dispatch(hideLoader());
  return dispatch({
    type: LOADEDPAGE,
    repositories: {
      category: PERSONAGE,
      parameters,
      resourceData
    }
  });
}

function checkUpdate( countLoad ){
  return countLoad === 3;
}

export const personage = () => {
  return (dispatch, getState) => {
    let countLoad = 0;

    dispatch(showLoader());
    dispatch(startLoading());

    let data = getState(), parameters = data.repositories.parameters;
    const url = `https://swapi.co/api/${parameters.resource}/${parameters.id}`;
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        countLoad = countLoad + 1;

        // #2 homeworld
        fetch( resourceData.homeworld )
          .then( res => res.json() )
          .then( json => {
            resourceData.homeworld = json.name;
            resourceData.homeworldId = json.url.match(/\d+/g)[0];

            countLoad = countLoad + 1;
            if( checkUpdate(countLoad)){
              return updateStore(dispatch, parameters, resourceData);
            }
          }).catch(function(error){
                    countLoad = countLoad + 1;
                    if( checkUpdate(countLoad)){
                      return updateStore(dispatch, parameters, resourceData);
                    }
                    console.log('action-personage-homeworld', error);
        });

        // #3 films
        if(resourceData.films.length){
          const resourceFilms = Array.concat([], resourceData.films);
          resourceData.films = [];
          let countFilms = 0;
          resourceFilms.forEach( elm => {
            countFilms = countFilms + 1;
            fetch( elm )
              .then( res => res.json() )
              .then( json => {
                resourceData.films.push({
                  name: json.title,
                  num: json.episode_id,
                  id: json.url.match(/\d+/g)[0]
                });
                if( resourceFilms.length === countFilms ){
                  countLoad = countLoad + 1;
                  if( checkUpdate(countLoad)){
                    return updateStore(dispatch, parameters, resourceData);
                  }
                }
              }).catch(function(error){
                        if( resourceFilms.length === countFilms ){
                          countLoad = countLoad + 1;
                          if( checkUpdate(countLoad)){
                            return updateStore(dispatch, parameters, resourceData);
                          }
                        }
                        console.log('action-personage-films', error);
            });
          });

        } else {
          countLoad = countLoad + 1;
          if( checkUpdate(countLoad) ){
            return updateStore(dispatch, parameters, resourceData);
          }
        }
        // #4 species
        // #5 vehicles
        // #6 starships
        }
      ).catch(function(error){
        console.log('action-personage-all', error)
      });
  }
};

/*
1     {
     "name":"Quarsh Panaka",
     "height":"183",
     "mass":"unknown",
     "hair_color":"black",
     "skin_color":"dark",
     "eye_color":"brown",
     "birth_year":"62BBY",
     "gender":"male",
2     "homeworld":"https://swapi.co/api/planets/8/",
3     "films":["https://swapi.co/api/films/4/"],
4     "species":[],
5     "vehicles":[],
6     "starships":[],
     "created":"2014-12-19T17:55:43.348000Z",
     "edited":"2014-12-20T21:17:50.399000Z",
     "url":"https://swapi.co/api/people/42/"
     }
*/