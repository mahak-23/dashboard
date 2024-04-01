import React from "react";

//style
import "./style.css";

//icons
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { FaLitecoinSign } from "react-icons/fa6";

const sampleTrades = [
  { id: 1, type: "Buy", symbol: "BTC", amount: "10", price: "$5000" },
  { id: 2, type: "Sell", symbol: "ETH", amount: "5", price: "$2000" },
  { id: 3, type: "Buy", symbol: "LTC", amount: "20", price: "$100" },
  { id: 4, type: "Sell", symbol: "BTC", amount: "8", price: "$5500" },
  { id: 5, type: "Buy", symbol: "ETH", amount: "7", price: "$2200" },
  { id: 6, type: "Sell", symbol: "LTC", amount: "15", price: "$120" },
];

const Trades = () => {
  const getSymbolIcon = (symbol) => {
    switch (symbol) {
      case "BTC":
        return <FaBitcoin />;
      case "ETH":
        return <FaEthereum />;
      case "LTC":
        return <FaLitecoinSign />;
      default:
        return null;
    }
  };

  return (
    <div className="trades-container">
      <h2>Trades</h2>
      <div className="trades">
        {sampleTrades &&
          sampleTrades.map((trade) => (
            <div key={trade.id} className="trade">
              <div className="trade-info">
                <div className="trade-head">
                  <div className="trade-icon">
                    {getSymbolIcon(trade.symbol)}
                  </div>
                  <div className="trade-symbol">{trade.symbol}</div>
                </div>

                <div className="trade-prices">
                  <div className="trade-amount">Amount: {trade.amount}</div>
                  <div className="trade-price">Price: {trade.price}</div>
                </div>
              </div>
              <button className="trade-button">{trade.type}</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trades;
