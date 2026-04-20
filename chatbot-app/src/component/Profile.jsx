import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";

const initialState = {
  state: "",
  dateOfBirth: "",
  income: "",
  category: "",
  gender: "",
  occupation: "",
  education: "",
  ruralUrban: ""
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("Token");

  if (!token) return <h2>Access Denied</h2>;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      // const response = await fetch("http://localhost:5000/v1/user/profile", {
      const response = await fetch("https://chatbot-f4ah.onrender.com", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          income: Number(formData.income)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSuccessMsg("✅ Profile saved successfully");
      setFormData(initialState);

      setTimeout(() => setSuccessMsg(""), 3000);

    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4 px-4">
      <Card className="p-4 shadow-lg border-0" style={{ borderRadius: "16px" }}>
        
        {/* HEADER */}
        <div className="mb-4">
          <h3 className="fw-bold">👤 User Profile</h3>
          <p className="text-muted mb-0">
            Fill your details to get accurate scheme recommendations
          </p>
        </div>

        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>

          {/* PERSONAL INFO */}
          <Card className="p-3 mb-4 border-0 bg-light">
            <h5 className="mb-3">Personal Information</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    value={formData.state}
                    placeholder="Enter your state"
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Area Type</Form.Label>
                  <Form.Select
                    value={formData.ruralUrban}
                    onChange={(e) => handleChange("ruralUrban", e.target.value)}
                    required
                  >
                    <option value="">Select Area</option>
                    <option>Rural</option>
                    <option>Urban</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card>

          {/* ECONOMIC INFO */}
          <Card className="p-3 mb-4 border-0 bg-light">
            <h5 className="mb-3">Economic Details</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Annual Income</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.income}
                    placeholder="Enter income"
                    onChange={(e) => handleChange("income", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option>General</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>OBC</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card>

          {/* PROFESSIONAL INFO */}
          <Card className="p-3 mb-4 border-0 bg-light">
            <h5 className="mb-3">Professional Details</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    value={formData.occupation}
                    placeholder="e.g. Farmer, Student"
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Education</Form.Label>
                  <Form.Select
                    value={formData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    required
                  >
                    <option value="">Select Education</option>
                    <option>Below 10th</option>
                    <option>10th Pass</option>
                    <option>12th Pass</option>
                    <option>Graduate</option>
                    <option>Postgraduate</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-100 py-2"
            variant="success"
            disabled={loading}
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>

        </Form>
      </Card>
    </div>
  );
};

export default Profile;
