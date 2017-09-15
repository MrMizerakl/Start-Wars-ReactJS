import { LOADEDPAGE, PLANETS } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const planets = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/planets';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: PLANETS,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};