import './App.css';
import React from 'react';
import Chatbot from './component/Chatbot';
import Navbar from './component/Navbar';
import PrivateComponent from "./component/privateComponent";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Home from './component/Home';
import Login from './component/Login';
import AddFaq from './AddFaq';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
             <Route path="/addfaq" element={<AddFaq />} />       
          <Route path ="/chatbot" element={  <Chatbot />} />


          </Route>
          <Route path ="/signup" element={  <Signup />} />
          <Route path ="/login" element={ <Login  />} />
           <Route path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
