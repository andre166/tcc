import React from 'react';
import './app.css';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import store from './components/store';

function App() {
  return (
    <Provider store={store}  style={{height: "100% !important"}}>
      <Navbar  style={{height: "100%  !important"}}/>
    </Provider>
  );
}

export default App;
