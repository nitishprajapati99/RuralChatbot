import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    try {
      // Logic-based URL selection
      const url = formData.role === "admin" 
        ? "http://localhost:5000/api/v1/admin/login" 
        : "http://localhost:5000/api/v1/users/login";

      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("Token", result.token);
        localStorage.setItem("isAdmin", formData.role === "admin" ? "true" : "false");
        
        setSuccessMsg(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} logged in successfully!`);
        
        setTimeout(() => {
          setSuccessMsg("");
          navigate('/chatbot');
        }, 1500);
      } else {
        setErrorMsg(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Server error. Please check if the backend is running.");
    }
  };

  const loginStyles = `
    .login-page {
      background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-card {
      border: none;
      border-radius: 20px;
      width: 100%;
      max-width: 420px;
      padding: 20px;
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
      margin-bottom: 30px;
    }

    .form-label {
      font-weight: 600;
      color: #4a5568;
      font-size: 0.85rem;
      margin-bottom: 8px;
    }

    .form-control, .form-select {
      border-radius: 10px;
      padding: 12px;
      border: 1px solid #e2e8f0;
      background: #f7fafc;
      transition: all 0.3s ease;
    }

    .form-control:focus, .form-select:focus {
      border-color: #48bb78;
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
      background: #fff;
    }

    .login-btn {
      background: #38a169;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-weight: 700;
      font-size: 1rem;
      margin-top: 10px;
      transition: all 0.3s ease;
    }

    .login-btn:hover {
      background: #2f855a;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(56, 161, 105, 0.3);
    }

    .alert {
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  `;

  return (
    <div className="login-page">
      <style>{loginStyles}</style>
      <Container>
        <Card className="login-card mx-auto">
          <Card.Body>
            <div className="brand-logo">🌾 Gramin Sahayak</div>
            <div className="brand-subtext">Access your rural development portal</div>

            {successMsg && <Alert variant="success" className="fade show">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger" className="fade show">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Account Type</Form.Label>
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
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 login-btn">
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
