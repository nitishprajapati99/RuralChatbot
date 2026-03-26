# 🌾 Rural Chatbot – Smart Government Scheme Assistant

## 🚩 Problem

Millions of people in rural areas struggle to access government schemes due to:

* Lack of awareness
* Complex eligibility criteria
* Language barriers
* Poor digital literacy

Most government portals are **too complex, fragmented, and not user-friendly** for rural users.

## ✅ Solution

Rural Chatbot simplifies access to government schemes by:

* Understanding user queries in simple language
* Matching users with relevant schemes based on their profile
* Providing multilingual responses (English & Hindi)
* Reducing dependency on manual assistance

---

## 📌 Overview

Rural Chatbot is an **AI-powered assistant** that helps users discover government schemes tailored to their eligibility.

Instead of searching through multiple websites, users can:

* Chat naturally
* Provide basic profile details
* Get personalized scheme recommendations instantly

---

## ✨ Key Features

* 🤖 **Conversational Interface**

  * Chat-based interaction for ease of use

* 🎯 **Smart Scheme Matching**

  * Filters schemes based on:

    * Age
    * Income
    * Category
    * Gender
    * Occupation
    * Location

* 🌐 **Multilingual Support**

  * English + Hindi responses

* 🧠 **Admin Learning System**

  * Admin can add new schemes dynamically

* 👤 **User Profile System**

  * Stores user data for accurate recommendations

* ⚡ **Real-time Response**

  * Fast and relevant answers

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other

* REST APIs
* JWT Authentication

---

## 📁 Project Structure

```
rural-chatbot/
│
├── client/                # React frontend
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/                # Node backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
├── config/                # DB & environment configs
├── README.md
└── package.json
```

---

## ⚙️ How It Works

1. User logs in and fills profile
2. User asks a query (e.g., "schemes for farmers")
3. System:

   * Extracts intent
   * Matches with stored schemes
   * Filters using eligibility criteria
4. Returns best-matching schemes

Admin can:

* Add new schemes
* Update scheme details

---

## 🚀 Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rural-chatbot.git
cd rural-chatbot
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file in server:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### 4. Run the Project

#### Start Backend

```bash
cd server
npm start
```
<<<<<<< HEAD
=======

#### Start Frontend

```bash
cd client
npm start
```

---

## 📌 Future Improvements

* Voice-based interaction (for low literacy users)
* Regional language support
* AI-based recommendation engine (NLP)
* Mobile app version
* Offline mode support

---

## 🤝 Contribution

Contributions are welcome. Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is open-source and available Github

---

## 💡 Final Note

This is not just a chatbot — it's a step toward **making government services accessible to everyone**, especially underserved rural communities.
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea

#### Start Frontend

```bash
cd client
npm start
```

---

## 📌 Future Improvements

* Voice-based interaction (for low literacy users)
* Regional language support
* AI-based recommendation engine (NLP)
* Mobile app version
* Offline mode support

---

## 🤝 Contribution

Contributions are welcome. Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is open-source and available Github

---

## 💡 Final Note

This is not just a chatbot — it's a step toward **making government services accessible to everyone**, especially underserved rural communities.
