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
  const [names, setNames] = useState<string[]>([]);
  const [currentCoin, setCurrentCoin] = useState<string>('');

  useEffect(() => {
    const filtered = coins.map((coin) => coin.name);
    const unique = Array.from(new Set(filtered));
    setNames(unique);
  }, []);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    let data = new URLSearchParams(Object.entries(currentCoin)).toString();
    const result = await fetch('https://cryptosolutions.herokuapp.com/coin', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const toJSON = await result.json();
    await console.log(toJSON);
  }

  function inputChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) {
    return setCurrentCoin(value);
    // setCurrentCoin(event.target.value);
  }

  // function getLabelHandler(option: any) {
  //   console.log(option.label);
  // }

  return (
    <div className='App'>
      <form onSubmit={submitHandler}>
        <Autocomplete
          options={names}
          getOptionLabel={(option) => option}
          onChange={(event: any, value: any) => setCurrentCoin(value)}
          renderInput={(params) => <TextField {...params} label='coins' />}
        />
        <button type='submit'>submit</button>
        <div>{currentCoin}</div>
      </form>
    </div>
  );
}

export default App;
