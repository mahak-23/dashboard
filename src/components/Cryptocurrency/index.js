import React, { useEffect } from "react";
import { connect } from "react-redux";

//actions
import { fetchCryptocurrencyData } from "../../actions/app";

//icon
import Loader from "../../assets/loader.gif"

//style
import "./style.css";

const Cryptocurrency = ({ cryptoData, fetchCryptocurrencyData }) => {
  const { data, loader, error } = cryptoData;

  useEffect(() => {
    fetchCryptocurrencyData();
  }, []);

  return (
    <div className="crypto-card">
      {loader ? (
        <div className="loader-align">
          <img src={Loader} />
        </div>
      ) : error ? (
        <div className="loader-align error"> {error} </div>
      ) : (
        data && (
          <div className="crypto-prices">
            {Object.keys(data.bpi).map((currency) => (
              <div key={currency} className="crypto-price">
                <h3>{currency}</h3>
                <h5>{data.bpi[currency].description}</h5>
                <div
                  style={{
                    fontSize:"18px",
                    display: "flex",
                    gap: "6px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{color:"#D0F0C0"}}>{data.bpi[currency].rate}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.bpi[currency].symbol,
                    }}

                    style={{color:"#32CD32"}}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cryptoData: state.home.crypto,
});

export default connect(mapStateToProps, { fetchCryptocurrencyData })(
  Cryptocurrency
);
