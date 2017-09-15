import { LOADEDPAGE, FILMS } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const films = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/films';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: FILMS,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};