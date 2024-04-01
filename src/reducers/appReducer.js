const INITIAL_STATE = {
  population: {
    loader: false,
    data: null,
    error: null,
  },
  crypto: {
    loader: false,
    data: null,
    error: null,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCHING_POPULATION":
      return {
        ...state,
        population: {
          ...state.population,
          loader: true,
          error: null,
          data: null,
        },
      };

    case "FETCH_POPULATION_SUCCESS":
      return {
        ...state,
        population: {
          ...state.population,
          loader: false,
          error: null,
          data: payload,
        },
      };

    case "FETCH_POPULATION_FAILURE":
      return {
        ...state,
        population: {
          ...state.population,
          loader: false,
          error: payload,
        },
      };

    case "FETCHING_CRYPTO":
      return {
        ...state,
        crypto: {
          ...state.crypto,
          loader: true,
          error: null,
          data: null,
        },
      };

    case "FETCH_CRYPTO_SUCCESS":
      return {
        ...state,
        crypto: {
          ...state.crypto,
          data: payload,
          error: null,
          loader: false,
        },
      };

    case "FETCH_CRYPTO_FAILURE":
      return {
        ...state,
        crypto: {
          ...state.crypto,
          error: payload,
          loader: false,
        },
      };

    default:
      return {
        ...state,
      };
  }
};
