document.addEventListener('DOMContentLoaded', function () {
  fetchStockData();
});

function fetchStockData() {
  // Using the Yahoo Finance API to fetch stock data
  const apiUrl = 'https://query1.finance.yahoo.com/v7/finance/quote';
  const symbols = ['AAPL', 'GOOGL', 'MSFT'];

  const promises = symbols.map(symbol => {
    return fetch(`${apiUrl}?symbol=${symbol}`)
      .then(response => response.json())
      .then(stockData => ({
        symbol: symbol,
        name: stockData.quoteType.longName,
        price: stockData.quoteSummary.detail ? stockData.quoteSummary.detail.currentPrice.raw : null,
      }))
      .catch(error => {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        return { symbol: symbol, name: 'N/A', price: 'N/A' };
      });
  });

  Promise.all(promises)
    .then(stockData => {
      displayData('stockList', stockData);
    })
    .catch(error => console.error('Error fetching stock data:', error));
}

// The displayData function remains unchanged
function displayData(listId, data) {
  const listElement = document.getElementById(listId);
  listElement.innerHTML = '';

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${item.symbol}</strong>: ${item.name} - $${item.price || 'N/A'}`;
    listElement.appendChild(listItem);
  });
}
