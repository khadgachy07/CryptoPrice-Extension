chrome.runtime.onInstalled.addListener(function () {
  // Do nothing on install, you can modify this based on your needs
});

chrome.runtime.onMessage.addListener(function (request,sender, sendResponse) {
  if (request.action === "fetchCryptoPrices") {
    fetchData(request.key)
      .then((prices) => {
        sendResponse({ prices });
      })
      .catch((error) => {
        sendResponse({ error: "Error fetching data" });
      });
    return true;
  }
});
async function fetchData(keys) {
  try {
    const prices = {};
    for (const key of keys) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${key}/market_chart?vs_currency=usd&days=1`
      );
      const data = await response.json();
      prices[key] = data.prices[0][1];
    }
    return prices;

  } catch (error) {
    throw new Error("Error fetching data");
  }
}
