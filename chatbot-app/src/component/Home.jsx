import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
const Navigate = useNavigate();
const loginchecker = () => {
if (localStorage.getItem("Token")) {
Navigate('/chatbot');
} else {
Navigate('/login');
}
};

// The multi-line CSS string, embedded for a self-contained component
const homeStyles = `
/* Custom CSS styles for the improved design */

.home-container {
max-width: 1200px;
margin: 0 auto;
padding: 40px 20px;
}

/* Hero Section as a full-width card */
.hero-section {
text-align: center;
padding: 50px 30px;
background-color: #fcfcfc; /* A very light, clean off-white */
border-radius: 12px;
border: 1px solid #e0e0e0;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Subtle shadow for depth */
margin-bottom: 50px;
}

.hero-section h1 {
font-size: 2.5rem;
font-weight: 700;
color: #333;
margin-bottom: 10px;
}

.hero-section p {
font-size: 1.1rem;
color: #555;
margin-bottom: 30px;
}

.hero-btn {
padding: 12px 24px;
font-size: 1rem;
border-radius: 8px;
transition: transform 0.2s, background-color 0.2s;
}

.hero-btn:hover {
transform: scale(1.03); /* Subtle scale-up on hover */
}

/* Features Section - Row of Cards */
.features-row {
display: flex;
flex-wrap: wrap; /* Crucial for responsiveness on small screens */
gap: 20px;
justify-content: space-around;
margin-bottom: 50px;
}

/* Feature Card Base Styles */
.feature-card {
flex: 1 1 300px; /* Base width of 300px, but can grow/shrink to fill space */
background-color: #fff;
border: 1px solid #e0e0e0;
border-radius: 10px;
padding: 25px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
text-align: left; /* Alignment control */
transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;

/* Animation: Initial state for staggered entry */
opacity: 0;
transform: translateY(20px);
animation: slideUp 0.6s ease-out forwards;
}

/* Interaction on hover for each feature card */
.feature-card:hover {
transform: translateY(-3px) scale(1.01); /* Subtle lift and scale */
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Deeper shadow on hover */
background-color: #f9f9f9;
}

.feature-card h5 {
font-size: 1.25rem;
font-weight: 600;
color: #333;
margin-bottom: 15px;
display: flex; /* Optional: Align an icon with the title */
align-items: center;
}

.feature-card p {
font-size: 0.95rem;
color: #666;
margin: 0;
line-height: 1.5; /* Improved readability */
}

/* Keyframe definition for the staggered slideUp animation */
@keyframes slideUp {
to {
opacity: 1;
transform: translateY(0);
}
}

/* Staggering the animation for each child .feature-card */
.feature-card:nth-child(1) { animation-delay: 0.2s; }
.feature-card:nth-child(2) { animation-delay: 0.4s; }
.feature-card:nth-child(3) { animation-delay: 0.6s; }

/* Responsiveness: Breakpoint for screens smaller than 768px */
@media screen and (max-width: 767px) {
.hero-section {
padding: 30px 15px;
margin-bottom: 30px;
}
.hero-section h1 {
font-size: 1.8rem;
margin-bottom: 15px;
}
.features-row {
justify-content: center; /* Center cards on smaller screens */
gap: 15px;
}
.feature-card {
flex: 1 1 100%; /* Make each card take full width on mobile */
}
}

/* Footer Styling */
.home-footer {
text-align: center;
padding: 20px 0;
font-size: 0.9rem;
color: #999;
border-top: 1px solid #e0e0e0;
margin-top: 30px;
}
`;

return (
<div className="home-container">
{/* Injected styles for this component */}
<style>{homeStyles}</style>

{/* Hero Section as an expanded, styled card */}
<div className="hero-section">
<h1>Rural Chatbot</h1>
<p>Your rural assistant for daily questions and government services</p>
<button className="btn btn-primary hero-btn" onClick={loginchecker}>Start Chat</button>
</div>

{/* Features Section - Row of animated cards */}
<div className="features-row">
<div className="feature-card">
<h5>Ask Any Question</h5>
<p>Get help about farming, schemes, health, and education.</p>
</div>

<div className="feature-card">
<h5>Bi-Language Support</h5>
<p>Answers in English and Hindi.</p>
</div>

<div className="feature-card">
<h5>Teach the Bot</h5>
<p>Admins can add new FAQs and improve accuracy.</p>
</div>
</div>

{/* Styled Footer */}
<footer className="home-footer">
© Rural Chatbot | Made by Nitish Kumar and Team's Project
</footer>
</div>
);
};

export default Home;