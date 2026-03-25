import './App.css';
import React from 'react';
import Chatbot from './component/Chatbot';
import Navbar from './component/Navbar';
import PrivateComponent from "./AccessComponent/privateComponent";
import PublicRoute from './AccessComponent/publicComponent';
import FaqGate from "./AccessComponent/AddFaqComponent";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Home from './component/Home';
import Login from './component/Login';
import AddFaq from './component/AddFaq';
<<<<<<< HEAD
import Profile from './component/Profile';  
import MySchemes from './component/my-scheme';
import ViewProfile from './component/viewProfile';
=======
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea

function App() {
  return (
    <div>
      <BrowserRouter>
        
<<<<<<< HEAD
=======

          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route element={<FaqGate />}>
                <Route path="/addfaq" element={<AddFaq />} />
              </Route>
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea

          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route element={<FaqGate />}>
                <Route path="/addfaq" element={<AddFaq />} />
              </Route>
              <Route path="/profile" element={<Profile />} />           
              <Route path="/my-schemes" element={<MySchemes />} />  
              <Route path="/view-profile" element={<ViewProfile />} />        
              <Route path="/chatbot" element={<Chatbot />} />




            </Route>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />


            <Route path='/' element={<Home />} />

          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
