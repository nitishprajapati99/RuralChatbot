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


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<FaqGate />}>
            <Route path="/addfaq" element={<AddFaq />} />
            </Route>

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
