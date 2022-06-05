const coins = require('./coins.json');

const filtered = coins.reduce((acc, coin) => {
  if (!acc[coin.name]) {
    acc[coin.name] = coin.reward_unit;
  }
  return acc;
}, {});

const filteredCoins = [];

for (const coin in filtered) {
  const temp = {};
  temp[coin] = filtered[coin];
  filteredCoins.push(temp);
}

console.log(filteredCoins);
