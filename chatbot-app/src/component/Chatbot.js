import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Dropdown } from "react-bootstrap";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const Navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      Navigate('/login');
    }
  }, [Navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    const recognition = new speechRecognition();
    recognition.lang = lang === "en" ? "en-IN" : "hi-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => sendMessages(transcript), 500);
    };
    recognition.start();
  };

  const speak = (text) => {
    if (!isVoiceOn) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-IN" : "hi-IN";
    synth.speak(utterance);
  };

  const sendMessages = async (transcriptFromVoice) => {
    const messageToSend = transcriptFromVoice || input;
    if (!messageToSend.trim()) return;

    const newMessages = [...messages, { text: messageToSend, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // const response = await fetch("http://localhost:5000/chatbot/chat", {
      const response = await fetch("https://chatbot-f4ah.onrender.com/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token") || ""}`
        },
        body: JSON.stringify({ question: messageToSend, lang })
      });
      const data = await response.json();
console.log("Chatbot response: ", data);
      if (data.answer === "Not found") {
        setMessages((prev) => [...prev, { sender: "bot", text: lang === "hi" ? "माफ़ करें, मुझे इसका उत्तर नहीं पता।" : "Sorry, I don’t know the answer." }]);
        return;
      }
      // console.log(data);
      // setMessages((prev) => [...prev, { sender: "bot", text: `${data.answer.description} ${lang === "en" ? data.answer.benefits.en : data.answer.benefits.hi}` }]);


      // 1. Determine the localized benefit string
const selectedBenefit = lang === "en" ? data.answer.benefits.en : data.answer.benefits.hi;

// 2. Format the documents list (e.g., "Doc1, Doc2, Doc3")
const docsList = data.answer.requiredDocuments.join(", ");

// 3. Construct the full message
const fullMessage = `
  ${data.answer.description}\n\n
  💰 **${lang === "en" ? "Benefits" : "लाभ"}:** ${selectedBenefit}\n
  📋 **${lang === "en" ? "Documents" : "दस्तावेज"}:** ${docsList}\n
  🔗 **${lang === "en" ? "Apply here" : "यहाँ आवेदन करें"}:** ${data.answer.applyLink}
`;

// 4. Update the state
setMessages((prev) => [...prev, { 
  sender: "bot", 
  text: fullMessage 
}]);
      if (data.suggestedFaq) {
        data.suggestedFaq.forEach((sug) => {
          setMessages((prev) => [...prev, { sender: "bot", isSuggestion: true, text: sug }]);
        });
      }
      speak(data.answer.description);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Connection error" }]);
    }
  };

  const handleSuggestionClick = (text) => {
    sendMessages(text);
  };

  const styles = `
    .chat-wrapper {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modern-chat-card {
      width: 100%;
      max-width: 900px;
      height: 85vh;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 24px !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    .modern-header {
      background: rgba(13, 110, 253, 0.85) !important;
      backdrop-filter: blur(5px);
      padding: 20px 30px !important;
      border-radius: 24px 24px 0 0 !important;
      border: none !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .chat-body {
      flex: 1;
      overflow-y: auto;
      padding: 30px !important;
      background: transparent;
    }

    /* Message Bubbles */
    .msg-row {
      display: flex;
      margin-bottom: 20px;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .user-row { justify-content: flex-end; }
    .bot-row { justify-content: flex-start; }

    .bubble {
      padding: 12px 20px;
      max-width: 70%;
      font-size: 0.95rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }

    .user-bubble {
      background: #0d6efd;
      color: white;
      border-radius: 20px 20px 4px 20px;
    }

    .bot-bubble {
      background: white;
      color: #333;
      border-radius: 20px 20px 20px 4px;
      border: 1px solid #eee;
    }

    /* Suggestions */
    .suggestion-chip {
      background: white;
      border: 1.5px solid #0d6efd;
      color: #0d6efd;
      border-radius: 50px;
      padding: 8px 18px;
      margin: 5px;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s;
      cursor: pointer;
    }
    .suggestion-chip:hover {
      background: #0d6efd;
      color: white;
      transform: translateY(-2px);
    }

    /* Input Footer */
    .modern-footer {
      padding: 20px 30px !important;
      background: white !important;
      border-radius: 0 0 24px 24px !important;
      border-top: 1px solid #f0f0f0 !important;
    }

    .pill-input-group {
      background: #f8f9fa;
      border-radius: 50px;
      padding: 5px 15px;
      border: 1px solid #eee;
      display: flex;
      align-items: center;
      transition: all 0.3s;
    }

    .pill-input-group:focus-within {
      background: #fff;
      border-color: #0d6efd;
      box-shadow: 0 0 0 4px rgba(13,110,253,0.1);
    }

    .modern-input {
      background: transparent !important;
      border: none !important;
      padding: 10px 15px !important;
    }

    .modern-input:focus { box-shadow: none !important; }

    /* Voice Pulse */
    .mic-active {
      color: #ff4757 !important;
      animation: pulse-red 1.5s infinite;
    }
    @keyframes pulse-red {
      0% { transform: scale(1); text-shadow: 0 0 0 rgba(255, 71, 87, 0.7); }
      70% { transform: scale(1.2); text-shadow: 0 0 10px rgba(255, 71, 87, 0); }
      100% { transform: scale(1); text-shadow: 0 0 0 rgba(255, 71, 87, 0); }
    }
  `;

  return (
    <div className="chat-wrapper">
      <style>{styles}</style>
      <Card className="modern-chat-card">
        <Card.Header className="modern-header">
          <div className="d-flex align-items: center">
            <div className="bg-white rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🤖
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{lang === 'en' ? "Gramin Sahayak" : "ग्रामीण सहायक"}</h5>
              <small className="opacity-75">{listening ? 'Listening...' : 'Online'}</small>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button 
              variant="light" 
              size="sm" 
              className="rounded-pill px-3 fw-500"
              onClick={() => setIsVoiceOn(!isVoiceOn)}
            >
              {isVoiceOn ? "🔊 Voice On" : "🔇 Voice Off"}
            </Button>

            <Dropdown onSelect={(val) => setLang(val)}>
              <Dropdown.Toggle variant="light" size="sm" className="rounded-pill px-3">
                {lang === "en" ? "🇬🇧 English" : "🇮🇳 हिंदी"}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item eventKey="en">English</Dropdown.Item>
                <Dropdown.Item eventKey="hi">Hindi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        <Card.Body className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}>
              {msg.isSuggestion ? (
                <button className="suggestion-chip" onClick={() => handleSuggestionClick(msg.text)}>
                  {msg.text}
                </button>
              ) : (
                <div className={`bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                  {msg.text}
                  {msg.sender === "bot" && isVoiceOn && <span className="ms-2 opacity-50">🔊</span>}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>

        <Card.Footer className="modern-footer">
          <div className="pill-input-group">
            <Button 
              variant="link" 
              className={`p-0 me-2 fs-4 ${listening ? 'mic-active' : 'text-muted'}`}
              onClick={startListening}
            >
              🎤
            </Button>
            <Form.Control
              className="modern-input"
              placeholder={lang === 'en' ? 'Type a message...' : 'संदेश लिखें...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" ? sendMessages() : null}
            />
            <Button 
              variant="primary" 
              className="rounded-circle ms-2" 
              style={{ width: '40px', height: '40px', padding: 0 }}
              onClick={() => sendMessages()}
            >
              ➤
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Chatbot;
