export const logger = ({dispatch, getState}) => next => action => {
  console.error('action', action.type, action);
  return next(action);
};
