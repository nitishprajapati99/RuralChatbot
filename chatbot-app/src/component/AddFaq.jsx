import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

const initialState = {
  schemeName: { en: "", hi: "" },
  description: { en: "", hi: "" },
  ministry: "",
  category: [],
  benefits: { en: "", hi: "" },
  tags: [],
  requiredDocuments: [],
  applyLink: "",
  eligibility: {
    state: "",
    minAge: "",
    maxAge: "",
    maxIncome: "",
    category: [],
    gender: "",
    occupation: []
  }
};

const AddFaq = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

<<<<<<< HEAD
  // Handle nested updates
  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const updated = { ...prev };
      let current = updated;
      keys.forEach((key, i) => {
        if (i === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });
      return updated;
=======
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
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
    });
  };

  // Handle comma-separated arrays
  const handleArrayInput = (path, value) => {
    handleChange(
      path,
      value.split(",").map((v) => v.trim()).filter(Boolean)
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/faq/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      // Reset form
      setFormData(initialState);
      setSuccessMsg("✅ Scheme added successfully");

      // Auto clear message
      setTimeout(() => setSuccessMsg(""), 3000);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <h2>Access Denied</h2>;

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">📋 Add Government Scheme</h4>

        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>

          {/* BASIC INFO */}
          <h5>Basic Info</h5>
          <Row>
            <Col>
              <Form.Control
                placeholder="Scheme Name (EN)"
                value={formData.schemeName.en}
                onChange={(e) => handleChange("schemeName.en", e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Scheme Name (HI)"
                value={formData.schemeName.hi}
                onChange={(e) => handleChange("schemeName.hi", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Control
                placeholder="Description (EN)"
                value={formData.description.en}
                onChange={(e) => handleChange("description.en", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Description (HI)"
                value={formData.description.hi}
                onChange={(e) => handleChange("description.hi", e.target.value)}
              />
            </Col>
          </Row>

          <Form.Control
            className="mt-2"
            placeholder="Ministry"
            value={formData.ministry}
            onChange={(e) => handleChange("ministry", e.target.value)}
          />

          <Form.Control
            className="mt-2"
            placeholder="Category (comma separated)"
            value={formData.category.join(", ")}
            onChange={(e) => handleArrayInput("category", e.target.value)}
          />

          {/* ELIGIBILITY */}
          <h5 className="mt-4">Eligibility</h5>

          <Row>
            <Col>
              <Form.Control
                placeholder="State"
                value={formData.eligibility.state}
                onChange={(e) => handleChange("eligibility.state", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Gender"
                value={formData.eligibility.gender}
                onChange={(e) => handleChange("eligibility.gender", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Control
                type="number"
                placeholder="Min Age"
                value={formData.eligibility.minAge}
                onChange={(e) => handleChange("eligibility.minAge", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Max Age"
                value={formData.eligibility.maxAge}
                onChange={(e) => handleChange("eligibility.maxAge", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Max Income"
                value={formData.eligibility.maxIncome}
                onChange={(e) => handleChange("eligibility.maxIncome", e.target.value)}
              />
            </Col>
          </Row>

          <Form.Control
            className="mt-2"
            placeholder="Occupation (comma separated)"
            value={formData.eligibility.occupation.join(", ")}
            onChange={(e) => handleArrayInput("eligibility.occupation", e.target.value)}
          />

          {/* BENEFITS */}
          <h5 className="mt-4">Benefits</h5>

          <Row>
            <Col>
              <Form.Control
                placeholder="Benefits (EN)"
                value={formData.benefits.en}
                onChange={(e) => handleChange("benefits.en", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Benefits (HI)"
                value={formData.benefits.hi}
                onChange={(e) => handleChange("benefits.hi", e.target.value)}
              />
            </Col>
          </Row>

          {/* EXTRAS */}
          <h5 className="mt-4">Extras</h5>

          <Form.Control
            className="mt-2"
            placeholder="Tags (comma separated)"
            value={formData.tags.join(", ")}
            onChange={(e) => handleArrayInput("tags", e.target.value)}
          />

          <Form.Control
            className="mt-2"
            placeholder="Required Documents (comma separated)"
            value={formData.requiredDocuments.join(", ")}
            onChange={(e) => handleArrayInput("requiredDocuments", e.target.value)}
          />

          <Form.Control
            className="mt-2"
            placeholder="Apply Link"
            value={formData.applyLink}
            onChange={(e) => handleChange("applyLink", e.target.value)}
          />

          <Button
            className="mt-4 w-100"
            variant="success"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Scheme"}
          </Button>

        </Form>
      </Card>
    </div>
  );
};

export default AddFaq;