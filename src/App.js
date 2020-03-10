import React from 'react';
import logo from './logo.svg';
import './App.css';
import PizzaList from './components/PizzaList';
import AddPizzaForm from './components/AddPizzaForm';

function App() {
  return (
    <div className="App">
      <PizzaList />
      <AddPizzaForm />
    </div>
  );
}

export default App;
