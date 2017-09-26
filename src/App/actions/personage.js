import { LOADEDPAGE, PERSONAGE, UPDATE_SEARCH_PARAMETERS } from './../constants';
import { hideLoader, showLoader } from "./loader";

export function updateSearchParameters({ parameters }) {
  return {
    repositories: {
      parameters,
    },
    type: UPDATE_SEARCH_PARAMETERS,
  };
}

export const personage = () => {
  return (dispatch, getState) => {
    dispatch(showLoader());
    let data = getState(), parameters = data.repositories.parameters;
    const url = `https://swapi.co/api/${parameters.resource}/${parameters.id}`;
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;

        console.log('personage resoursedata ', resourceData);

        if(resourceData.homeworld){
          return fetch( resourceData.homeworld )
            .then( res => res.json() )
            .then(json => {
              resourceData.homeworld =  json.name;
              resourceData.homeworldId = json.url.match(/\d+/g)[0];

              console.log('personage add homeworld', resourceData);
              dispatch(hideLoader());
              return dispatch({
                type: LOADEDPAGE,
                repositories: {
                  category: PERSONAGE,
                  parameters,
                  resourceData
                }
              });
          });
        } else {
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
        }
      );
  }
};

/*
     {
     "name":"Quarsh Panaka",
     "height":"183",
     "mass":"unknown",
     "hair_color":"black",
     "skin_color":"dark",
     "eye_color":"brown",
     "birth_year":"62BBY",
     "gender":"male",
     "homeworld":"https://swapi.co/api/planets/8/",
     "films":["https://swapi.co/api/films/4/"],
     "species":[],
     "vehicles":[],
     "starships":[],
     "created":"2014-12-19T17:55:43.348000Z",
     "edited":"2014-12-20T21:17:50.399000Z",
     "url":"https://swapi.co/api/people/42/"
     }
*/