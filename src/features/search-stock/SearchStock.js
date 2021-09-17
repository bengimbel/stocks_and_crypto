import React from "react";

const SearchStock = ({ searchStockTermAction, fetchStockData, forms }) => {
  console.log(forms, 'f')
  const { searchStockTerm } = forms;
  return (
    <div>
      <input
        value={searchStockTerm}
        onChange={(e) => searchStockTermAction(e.target.value)}
      />
      <button onClick={fetchStockData}>Fetch Stock</button>
    </div>
  );
};

export default SearchStock;
