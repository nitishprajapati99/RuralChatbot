import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { SnackbarContext } from "../Context/SnackbarContext";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const Navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Dynamic URL selection based on role
      const url = formData.role === "admin" 
        ? "https://your-backend.onrender.com/api/admin/signup" 
        : "https://your-backend.onrender.com/api/users/signup";
      // const url = formData.role === "admin" 
      //   ? "http://localhost:5000/api/v1/admin/signup" 
      //   : "http://localhost:5000/api/v1/users/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        showSnackbar(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} registered successfully!`, "success");
        setTimeout(() => Navigate('/login'), 1500);
      } else {
        setErrorMsg(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Connection error. Is the server running?");
    }
  };

  const signupStyles = `
    .signup-page {
      background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .signup-card {
      border: none;
      border-radius: 20px;
      width: 100%;
      max-width: 450px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }

    .brand-logo {
      font-size: 1.8rem;
      font-weight: 800;
      color: #2d3748;
      text-align: center;
      margin-bottom: 5px;
    }

    .brand-subtext {
      text-align: center;
      color: #718096;
      font-size: 0.9rem;
      margin-bottom: 25px;
    }

    .form-label {
      font-weight: 600;
      color: #4a5568;
      font-size: 0.85rem;
      margin-bottom: 6px;
    }

    .form-control, .form-select {
      border-radius: 10px;
      padding: 10px;
      border: 1px solid #e2e8f0;
      background: #f7fafc;
      transition: all 0.3s ease;
    }

    .form-control:focus, .form-select:focus {
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
      background: #fff;
    }

    .signup-btn {
      background: #3182ce;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-weight: 700;
      font-size: 1rem;
      margin-top: 15px;
      transition: all 0.3s ease;
    }

    .signup-btn:hover {
      background: #2b6cb0;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(49, 130, 206, 0.3);
    }

    .alert {
      border-radius: 10px;
      font-size: 0.85rem;
    }
  `;

  return (
    <div className="signup-page">
      <style>{signupStyles}</style>
      <Container>
        <Card className="signup-card mx-auto">
          <Card.Body>
            <div className="brand-logo">🌾 Gramin Sahayak</div>
            <div className="brand-subtext">Create an account to get started</div>

            {errorMsg && <Alert variant="danger" className="py-2">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Joining as</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">Farmer / Citizen</option>
                  <option value="admin">Administrator</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a strong password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 signup-btn">
                Create Account
              </Button>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                </small>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SignupForm;
