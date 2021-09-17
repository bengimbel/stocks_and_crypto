import React from "react";

const SearchCrypto = ({ searchCryptoTermAction, fetchCryptoData, forms }) => {
  const { searchCryptoTerm } = forms;

  return (
    <div>
      <input
        value={searchCryptoTerm}
        onChange={(e) => searchCryptoTermAction(e.target.value)}
      />
      <button onClick={fetchCryptoData}>Fetch Crypto</button>
    </div>
  );
};

export default SearchCrypto;
