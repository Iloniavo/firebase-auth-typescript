import React from 'react';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './components/home'
import Login from './components/login';
import AuthRoute from './components/authRoute';
import SignUp from './components/createAccount';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
           <AuthRoute> 
            <Home/>
          </AuthRoute> 
        } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
