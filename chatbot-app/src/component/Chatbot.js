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
  const [isAdmin, setIsAdmin] = useState(false);
  // for Tech Form
  const [showTeachForm, setShowTeachForm] = useState(false);
  const [teachQ, setTeachQ] = useState("");
  const [teachEn, setTeachEn] = useState("");
  const [teachHi, setTeachHi] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [tags, setTags] = useState([]);



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

  // Teach Form Submission
  const handleTech = async (e) => {
    e.preventDefault();
    console.log({ question: teachQ, en: teachEn, hi: teachHi, synonyms: synonyms, tags: tags });

    await fetch("http://localhost:5000/faq/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: teachQ,
        en: teachEn,
        hi: teachHi,
        synonyms: synonyms,
        tags: tags
      })
    });

    setMessages((prev) => [...prev, { sender: "bot", text: "✅ Learned new FAQ!" }]);

    // Reset form
    setTeachQ("");
    setTeachEn("");
    setTeachHi("");
    setShowTeachForm(false);
  };


  // Function to send messages to the backend
  const sendMessages = async () => {

    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    try {
      const response = await fetch("http://localhost:5000/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: input, lang })
      }
      )
      const data = await response.json();
      if (data.answer.includes("माफ़")||data.answer.toLowerCase().includes("sorry")) {
        // console.log("API Response:", data.answer);
        const fallbackMsg = { sender: "bot", text: data.answer };
        setMessages((prev) => [...prev, fallbackMsg]);

        if (isAdmin) {
          setShowTeachForm(true);
        }
        else {
          setShowTeachForm(false);
        }
        
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
      const handleSuggestionClick =  (suggestedFaq) => {
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
                <Button
                  variant={isAdmin ? "warning" : "secondary"}
                  sizw="sm"
                  className="ml-2"
                  onClick={() => setIsAdmin(!isAdmin)}

                 >
                  {isAdmin ? "Admin Mode" : "User Mode"}

                </Button>
                {
                  isAdmin && showTeachForm && (
                    <div className="p-2 border mt-2 bg-light rounded">
                      <h6 className="text-dark">📝 Teach Bot a New Answer</h6>
                      <Form onSubmit={handleTech}>
                        <Form.Group className="me-2">
                          <Form.Label className="text-dark">Question</Form.Label>
                          <Form.Control
                            type="text"
                            value={teachQ}
                            placeholder="Enter the question"
                            onChange={(e) => setTeachQ(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="text-dark">Answer (English)</Form.Label>
                          <Form.Control
                            type="text"
                            value={teachEn}
                            placeholder="Enter the answer in English"
                            onChange={(e) => setTeachEn(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="text-dark">Answer (Hindi)</Form.Label>
                          <Form.Control
                            type="text"
                            value={teachHi}
                            placeholder="Enter the answer in Hindi"
                            onChange={(e) => setTeachHi(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="text-dark">Synonyms (Comma Separator)</Form.Label>
                          <Form.Control
                            type="text"

                            placeholder="eg: farm, cultivation"
                            onChange={(e) => setSynonyms(e.target.value.split(",").map(s => s.trim()))}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="text-dark">Tags(coma Separator)</Form.Label>
                          <Form.Control
                            type="text"

                            placeholder="eg: agriculture, farming"
                            onChange={(e) => setTags(e.target.value.split(",").map(t => t.trim()))}></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="success">Save FAQ</Button>
                      </Form>
                    </div>
                  )}
                <>  </>
                <Dropdown.Toggle variant="secondary"  size="sm">
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
                     onClick={async () =>{  handleSuggestionClick(msg.text.replace("👉 ", ""))}}
                  >{msg.text.replace("👉 ", "")}
                  </Button>) :(
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