import { LOADEDPAGE, VEHICLES } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const vehicles = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/vehicles';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: VEHICLES,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};