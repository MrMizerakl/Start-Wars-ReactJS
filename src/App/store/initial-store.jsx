export const repositories = {
  resourceData: []
};

export const loader = {
  loading: false,
};

export const search = {
  type: '',
  query: '',
  types: [],
  fetch: false,
};

export const searchResult = {
  fetching: false,
  results: {}
};

export const initialStore = {
  repositories,
  loader,
  search,
  searchResult
};