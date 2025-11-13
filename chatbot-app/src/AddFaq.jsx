import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";

const AddFaq = () => {
  // for Tech Form
  // const [showTeachForm, setShowTeachForm] = useState(false);
  const [teachQ, setTeachQ] = useState("");
  const [teachEn, setTeachEn] = useState("");
  const [teachHi, setTeachHi] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  // const [messages, setMessages] = useState([]);

  const [tags, setTags] = useState([]);
  // Teach Form Submission
  const handleTech = async (e) => {
    e.preventDefault();
    console.log({ question: teachQ, en: teachEn, hi: teachHi, synonyms: synonyms, tags: tags });

    const response = await fetch("http://localhost:5000/faq/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`

      },
      body: JSON.stringify({
        question: teachQ,
        en: teachEn,
        hi: teachHi,
        synonyms: synonyms,
        tags: tags
      })
    });
    const result = await response.json();
    console.log("result", result);

    // setMessages((prev) => [...prev, { sender: "bot", text: "✅ Learned new FAQ!" }]);
    alert("✅ Learned new FAQ!");

    // Reset form
    setTeachQ("");
    setTeachEn("");
    setTeachHi("");
    setSynonyms([]);
    setTags([]);
    // setShowTeachForm(false);
  };
  return (
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
            value={synonyms.join(", ")}   // controlled input

            placeholder="eg: farm, cultivation"
            onChange={(e) => setSynonyms(e.target.value.split(",").map(s => s.trim()))}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-dark">Tags(coma Separator)</Form.Label>
          <Form.Control
            type="text"
            value={tags.join(", ")}       // controlled input

            placeholder="eg: agriculture, farming"
            onChange={(e) => setTags(e.target.value.split(",").map(t => t.trim()))}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">Save FAQ</Button>
      </Form>
    </div>)
}

// component importing
export default AddFaq;