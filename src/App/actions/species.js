import { LOADEDPAGE, SPECIES } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const species = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/species';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: SPECIES,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};