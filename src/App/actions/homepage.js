import { HOME, LOADEDPAGE } from './../constants';

export const homepage = () => {
  return {
    type: LOADEDPAGE,
    repositories: {
      category: HOME,
      parameters: {},
      resourceData: []
    }
  }
};