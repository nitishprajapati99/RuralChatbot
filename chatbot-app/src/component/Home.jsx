import React from 'react';
import { useNavigate } from 'react-router-dom';

 const  Home = () =>{
  const Navigate = useNavigate();
  const loginchecker = ()=>{
    if(localStorage.getItem("Token")){
      Navigate('/chatbot')
    }else{
      Navigate('/login')
    }
  }
return (
    <div className="container mt-4">

  {/* Hero Section */}
  <div className="text-center p-4 bg-light rounded shadow">
    <h1 className="fw-bold">Rural Chatbot</h1>
    <p>Your rural assistant for daily questions and government services</p>
    <button className="btn btn-primary mt-2" onClick={loginchecker}>Start Chat</button>
  </div>

  {/* Features */}
  <div className="row mt-5">
    <div className="col-md-4">
      <div className="card p-3 shadow-sm">
        <h5>Ask Any Question</h5>
        <p>Get help about farming, schemes, health, and education.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card p-3 shadow-sm">
        <h5>Multi-Language Support</h5>
        <p>Answers in English and Hindi.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card p-3 shadow-sm">
        <h5>Teach the Bot</h5>
        <p>Admins can add new FAQs and improve accuracy.</p>
      </div>
    </div>
  </div>

  {/* Footer */}
  <footer className="text-center mt-5 mb-3 text-muted">
    © Rural Chatbot | Made for Rural Development
  </footer>
</div>

  )
}
 //components exporting
 export default Home