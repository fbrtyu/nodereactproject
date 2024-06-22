"use strict"
import React from 'react';
import './App.css';
import renderRegistrationPage from '../src/components/registration'
import renderLoginPage from '../src/components/login'
import { registration } from './api/jwt'

function App() {
  return (
    <div className="App">
      <h1>Привет</h1>
      <a onClick={() => {renderRegistrationPage() as any}}>Регистрация</a>
      <a onClick={() => {renderLoginPage() as any}}>Вход</a>
    </div>
  );
}

export default App;