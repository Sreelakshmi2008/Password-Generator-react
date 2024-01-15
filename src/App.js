import React from 'react'
import LandingPage from './components/pages/landingpage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from './components/pages/signuppage';
import './App.css'
import SignInPage from './components/pages/loginpage';
import Main from './components/main';

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/main" element={<Main />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
