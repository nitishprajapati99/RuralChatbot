# Rural Smart Chatbot — Empowering Villages with Technology  
###  Built for Smart India Hackathon | Theme: Computer & IT Technology  

> “Technology for everyone — even for those who can’t read or type.”  
A multilingual voice-enabled chatbot designed to help **rural citizens** access **government schemes, farming guidance, and basic information** easily — using **voice and local language**, not text.

---

## Overview

In many rural areas, people with **low literacy levels** struggle to access digital services or official information.  
The **Rural Smart Chatbot** solves this by allowing users to **speak** in Hindi or English and receive voice/text replies instantly.

Built with **Node.js, Express, React, and MongoDB**, this project bridges the communication gap between **technology and rural communities**.

---

##  Key Features

- 🗣️ **Voice-based Interaction** — Speak to the chatbot and get answers in your language.  
- 🌐 **Multilingual Support** — Currently supports **English and Hindi**, easily extendable to other languages.  
- 📚 **FAQ-based Knowledge System** — Stores government scheme data and common questions in MongoDB.  
- 💬 **Smart Suggestion System** — Suggests similar questions if user input doesn’t match exactly.  
- 🧠 **Self-learning Mode** — Admins can teach new answers directly from the interface.  
- ⚙️ **Modular Architecture** — Separate frontend, backend, and database layers for scalability.  
- 💻 **Offline/Screen Kiosk Vision** — Future goal: deploy on touch-screen kiosks in rural areas.

---

##  Tech Stack

**Frontend:** React + Bootstrap  
**Backend:** Node.js + Express  
**Database:** MongoDB (Mongoose ODM)  
**Speech Recognition:** Web Speech API  
**AI/NLP (optional):** OpenAI / Dialogflow  
**Hosting:** Render / Vercel / MongoDB Atlas  

---

## 📁 Project Structure
rural-chatbot/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── app.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── App.js
│ │ └── Chatbot.js
│ └── package.json
│
└── README.md




---

## 🧠 How It Works

1. User speaks or types a question.  
2. The chatbot processes input → detects language → searches MongoDB for similar FAQs.  
3. If found → returns the answer in user’s language.  
4. If not → suggests closest matches or stores query for admin review.  
5. Admin can later “teach” the chatbot new responses.

---

## ⚡ Installation Guide

```bash
# Clone repository
git clone https://github.com/yourusername/rural-chatbot.git
cd rural-chatbot

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend
npm start

# Run frontend
npm run dev

