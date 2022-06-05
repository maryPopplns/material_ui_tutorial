import './App.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Typography,
  Button,
  Alert,
  Autocomplete,
  TextField,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import coins from './coins.json';

function App() {
  const [allCoins, setAllCoins] = useState<{ name: string; coin: any }[]>([]);
  const [currentCoin, setCurrentCoin] = useState<string>('');

  useEffect(() => {
    const filtered = coins.reduce((acc: any, coin: any) => {
      if (!acc[coin.name]) {
        acc[coin.name] = coin.reward_unit;
      }
      return acc;
    }, {});

    const uniqueCoins = [];
    for (const coin in filtered) {
      const temp: any = {};
      temp[coin] = filtered[coin];
      uniqueCoins.push(temp);
    }
    const finalCoins = uniqueCoins.map((coin) => {
      const [name, symbol] = Object.entries(coin)[0];
      return { name, coin: symbol };
    });
    setAllCoins(finalCoins);
  }, [setAllCoins]);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    if (currentCoin) {
      const data = new URLSearchParams(
        Object.entries({ coin: currentCoin })
      ).toString();
      const result = await fetch('https://cryptosolutions.herokuapp.com/coin', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const toJSON = await result.json();
      console.log(toJSON);
    }
  }

  function inputChangeHandler(event: any, value: any) {
    setCurrentCoin(value.coin);
  }

  return (
    <div className='App'>
      <form onSubmit={submitHandler}>
        <Autocomplete
          options={allCoins}
          getOptionLabel={(option) => option.name}
          onChange={inputChangeHandler}
          renderInput={(params) => <TextField {...params} label='coins' />}
        />
        <button type='submit'>submit</button>
      </form>
      {/* <div>{currentCoin}</div> */}
    </div>
  );
}

export default App;
