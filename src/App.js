import React from 'react';
import './app.css';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import store from './components/store';

function App() {
  return (
    <Provider store={store} >
      <Navbar/>
    </Provider>
  );
}

export default App;
