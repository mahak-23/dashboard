import React from "react";
import "./style.css";

const History = () => {
  //sample history transactions
  const transactions = [
    { id: 1, type: "Buy", symbol: "BTC", amount: "10", price: "$5000" },
    { id: 2, type: "Sell", symbol: "ETH", amount: "5", price: "$2000" },
    { id: 3, type: "Buy", symbol: "LTC", amount: "20", price: "$100" },
    { id: 4, type: "Sell", symbol: "BTC", amount: "8", price: "$5500" },
    { id: 5, type: "Buy", symbol: "ETH", amount: "7", price: "$2200" },
    { id: 6, type: "Sell", symbol: "LTC", amount: "15", price: "$120" },
    { id: 7, type: "Buy", symbol: "BTC", amount: "12", price: "$4800" },
    { id: 8, type: "Sell", symbol: "ETH", amount: "3", price: "$2100" },
    { id: 9, type: "Buy", symbol: "LTC", amount: "25", price: "$90" },
    { id: 10, type: "Sell", symbol: "BTC", amount: "8", price: "$5500" },
    { id: 11, type: "Buy", symbol: "ETH", amount: "7", price: "$2200" },
    { id: 12, type: "Sell", symbol: "LTC", amount: "15", price: "$120" },
  ];

  return (
    <div className="history-container">
      <h2>Transaction History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Symbol</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.type}</td>
                <td>{transaction.symbol}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
