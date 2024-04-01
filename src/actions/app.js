export const fetchPopulationData = () => async (dispatch) => {
  dispatch({ type: "FETCHING_POPULATION" });
  try {
    const response = await fetch(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const data = await response.json();
    dispatch({
      type: "FETCH_POPULATION_SUCCESS",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_POPULATION_FAILURE",
      payload: error.message,
    });
  }
};

export const fetchCryptocurrencyData = () => async (dispatch) => {
  dispatch({ type: "FETCHING_CRYPTO" });
  try {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const data = await response.json();
    dispatch({
      type: "FETCH_CRYPTO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_CRYPTO_FAILURE",
      payload: error.message,
    });
  }
};
