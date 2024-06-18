"use strict"
import React from 'react';
import './App.css';
import { registration } from './api/jwt'

function App() {
  return (
    <div className="App">
      <h1>Привет</h1>
      <a>Регистрация</a>
      <a onClick={() => {registration("333", "555") as any}}>Вход</a>
    </div>
  );
}

export default App;