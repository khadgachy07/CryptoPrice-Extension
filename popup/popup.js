document.addEventListener("DOMContentLoaded", function () {
  const btcPrice = document.getElementById("btc_price");
  const ethPrice = document.getElementById("eth_price");

  chrome.runtime.sendMessage({action: "fetchCryptoPrices", key:["bitcoin", "ethereum"]}, function (response){
    if (response.error){
        btcPrice.innerHTML = 'Not Found'
        ethPrice.innerHTML = "Not Found"
    }else {
        const formattedBTC = response.prices.bitcoin.toFixed(4);
        btcPrice.innerHTML = `$ ${formattedBTC}`;

        const formattedETH = response.prices.ethereum.toFixed(4);
        ethPrice.innerHTML = `$${formattedETH}`
    }
  })

});
