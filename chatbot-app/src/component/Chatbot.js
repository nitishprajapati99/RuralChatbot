// import { Card } from '@mui/material';
import { Button, Form, InputGroup, Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import React, { useState } from 'react';
// import { set } from "mongoose";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);




  //funtion to start speech to text
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
      sendMessages(transcript);
    };
    recognition.start();
  };
  // 🗣️ Text-to-Speech (TTS)
  const speak = (text) => {
    if (!isVoiceOn) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-IN" : "hi-IN";
    synth.speak(utterance);
  };

  


  // Function to send messages to the backend
  const sendMessages = async () => {

    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    try {
      const response = await fetch("https://chatbot-f4ah.onrender.com/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("Token") || ""}`
        },
        body: JSON.stringify({ question: input, lang })
      }
      )
      const data = await response.json();
      if (data.answer.includes("माफ़") || data.answer.toLowerCase().includes("sorry")) {
        console.log("API Response:", data.answer);
        const fallbackMsg = { sender: "bot", text: data.answer };
        setMessages((prev) => [...prev, fallbackMsg]);

        

      }
      // Add bot reply
      setMessages([...newMessages, { sender: "bot", text: data.answer }]);

      //show suggestions if any
      if (data.suggestedFaq) {
        // const fallbackMsg = { sender: "bot", text: data.answer };
        // console.log(fallbackMsg);
        // setMessages((prev) => [...prev, fallbackMsg]);

        data.suggestedFaq.forEach((sug) => {
          setMessages((prev) => [...prev, { sender: "bot", text: `👉 ${sug}` }])
        });
      }






      //  Bot speaks
      speak(data.answer);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Server error" }]);
    };



    setInput("");


  };
  //handle suggestion click
  const handleSuggestionClick = (suggestedFaq) => {
    //  setMessages((prev) => [...prev, { sender: "user", text: suggestedFaq }]);
    setInput(suggestedFaq);
    //  sendMessages(suggestedFaq);
  };
  return (

    <Container className='mt-4'>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card >

            <Card.Header className="bg-primary text-white text-center">


              {lang === 'en' ? <span className="text-start"><h3>Gramin Sahayak</h3></span> : <span className="text-start"><h3>ग्रामीण सहायक</h3></span>}
              <Dropdown onSelect={(val) => setLang(val)} className="float-end">
                {/* Voice Toggle */}
                <Button
                  variant={isVoiceOn ? "success" : "secondary"}
                  size="sm"
                  className="me-2 "
                  onClick={() => setIsVoiceOn(!isVoiceOn)}
                >
                  {isVoiceOn ? "🔊 Voice On" : "🔇 Voice Off"}

                </Button>
                
                <Dropdown.Toggle variant="secondary" size="sm">
                  {lang === "en" ? "🇬🇧 English" : "🇮🇳 हिंदी"}

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="en">GB English</Dropdown.Item>
                  <Dropdown.Item eventKey="hi">🇮🇳 hindi</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>

            <Card.Body style={{ height: "55vh", overflowY: "auto" }}>

              {messages.map((msg, i) => (

                <div key={i} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                  <div className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`}>

                    {msg.text.startsWith("👉") ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={async () => { handleSuggestionClick(msg.text.replace("👉 ", "")) }}
                      >{msg.text.replace("👉 ", "")}
                      </Button>) : (
                      <>
                        {msg.text}
                        {msg.sender === "bot" && isVoiceOn && <span>🔊</span>}
                      </>
                    )}
                  </div>
                </div>

              ))}


            </Card.Body>
            <Card.Footer>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={lang === 'en' ? 'Ask me anything...' : 'मुझसे कुछ भी पूछें...'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" ? sendMessages() : null}
                />
                <Button variant="primary" onClick={sendMessages}>Send</Button>
                <Button
                  variant={listening ? "danger" : "secondary"}
                  onClick={startListening}
                >{lang === 'en' ? (listening ? "Listening..." : "🎤 Speak Now") : (listening ? "सुन रहा है..." : "🎤 अब बोलो")}

                </Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </Col>
      </Row>


    </Container>
  )
}

export default Chatbot;
