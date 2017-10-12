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

const updateStore = (dispatch, parameters, resourceData) => {
  dispatch(hideLoader());
  return dispatch({
    type: LOADEDPAGE,
    repositories: {
      category: PERSONAGE,
      parameters,
      resourceData
    }
  });
};

const checkUpdate = ( countLoad ) => {
  return countLoad === 6;
};

// const loadSwapiData = ( nameArr, resourceData )  => {
//   const resourceFilms = [];
//   let countFilms = 0;
//   resourceData[nameArr].forEach( elm => {
//     countFilms = countFilms + 1;
//     fetch( elm )
//       .then( res => res.json() )
//       .then( json => {
//         return resourceFilms.push({
//           name: json.title || json.name,
//           num: json.episode_id || null,
//           id: json.url.match(/\d+/g)[0]
//         });
//       }).catch(function(error){
//         console.log('action-personage-films', error);
//         return resourceFilms;
//     });
//   });
// };


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
              console.log('personage return homeworld load', resourceData);
              return updateStore(dispatch, parameters, resourceData);
            }
          }).catch(function(error){
                    countLoad = countLoad + 1;
                    if( checkUpdate(countLoad)){
                      console.log('personage return homeworld error');
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
                return resourceData.films.push({
                  name: json.title,
                  num: json.episode_id,
                  id: json.url.match(/\d+/g)[0]
                });
              })
              .then( () => {
                  countLoad = countLoad + 1;
                  if( checkUpdate(countLoad)){
                    console.log('personage return films load', resourceData );
                    return updateStore(dispatch, parameters, resourceData);
                  }
                }
              ).catch(function(error){
                        if( resourceFilms.length === countFilms ){
                          countLoad = countLoad + 1;
                          if( checkUpdate(countLoad)){
                            console.log('personage return films error');
                            return updateStore(dispatch, parameters, resourceData);
                          }
                        }
                        console.log('action-personage-films', error);
            });
          });
        } else {
          countLoad = countLoad + 1;
          if( checkUpdate(countLoad) ){
            console.log('personage return personage load');
            return updateStore(dispatch, parameters, resourceData);
          }
        }

        // #4 species
        if(resourceData.species.length){
          // resourceData.species = loadSwapiData('species', resourceData);
          const resourceSpecies = Array.concat([], resourceData.species);
          resourceData.species = [];
          let countSpecies = 0;
          resourceSpecies.forEach( elm => {
            countSpecies = countSpecies + 1;
            fetch( elm )
              .then( res => res.json() )
              .then( json => {
                return resourceData.species.push({
                  name: json.name,
                  id: json.url.match(/\d+/g)[0]
                });
              })
              .then( () => {
                  countLoad = countLoad + 1;
                  if( checkUpdate(countLoad)){
                    console.log('personage return species load', resourceData );
                    return updateStore(dispatch, parameters, resourceData);
                  }
                }
              ).catch(function(error){
                        countLoad = countLoad + 1;
                        if( checkUpdate(countLoad)){
                          console.log('personage return species error', error);
                          return updateStore(dispatch, parameters, resourceData);
                        }
            });
          });
        } else {
          countLoad = countLoad + 1;
          if( checkUpdate(countLoad) ){
            console.log('personage return species mo-data');
            return updateStore(dispatch, parameters, resourceData);
          }
        }
        // #5 vehicles
        if(resourceData.vehicles.length){
          const resourceVehicles = Array.concat([], resourceData.vehicles);
          resourceData.vehicles = [];
          let countVehicles = 0;
          resourceVehicles.forEach( elm => {
            countVehicles = countVehicles + 1;
            fetch( elm )
              .then( res => res.json() )
              .then( json => {
                return resourceData.vehicles.push({
                  name: json.name,
                  id: json.url.match(/\d+/g)[0]
                });
              })
              .then( () => {
                  countLoad = countLoad + 1;
                  if( checkUpdate(countLoad)){
                    console.log('personage return vehicles load', resourceData );
                    return updateStore(dispatch, parameters, resourceData);
                  }
                }
              ).catch(function(error){
              countLoad = countLoad + 1;
              if( checkUpdate(countLoad)){
                console.log('personage return vehicles error', error);
                return updateStore(dispatch, parameters, resourceData);
              }
            });
          });
        } else {
          countLoad = countLoad + 1;
          if( checkUpdate(countLoad) ){
            console.log('personage return vehicles mo-data');
            return updateStore(dispatch, parameters, resourceData);
          }
        }

        // #6 starships
        if(resourceData.starships.length){
          const resourceStarships = Array.concat([], resourceData.starships);
          resourceData.starships = [];
          let countStarships = 0;
          resourceStarships.forEach( elm => {
            countStarships = countStarships + 1;
            fetch( elm )
              .then( res => res.json() )
              .then( json => {
                return resourceData.starships.push({
                  name: json.name,
                  id: json.url.match(/\d+/g)[0]
                });
              })
              .then( () => {
                  countLoad = countLoad + 1;
                  if( checkUpdate(countLoad)){
                    console.log('personage return starships load', resourceData );
                    return updateStore(dispatch, parameters, resourceData);
                  }
                }
              ).catch(function(error){
              countLoad = countLoad + 1;
              if( checkUpdate(countLoad)){
                console.log('personage return starships error', error);
                return updateStore(dispatch, parameters, resourceData);
              }
            });
          });
        } else {
          countLoad = countLoad + 1;
          if( checkUpdate(countLoad) ){
            console.log('personage return starships mo-data');
            return updateStore(dispatch, parameters, resourceData);
          }
        }
      }).catch(function(error){
        console.log('personage return personage error');
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