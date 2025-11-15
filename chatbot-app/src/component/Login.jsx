import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
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
    // console.log(formData);
    // API logic here

    if (formData.role === "user") {
      var response = await fetch("https://chatbot-f4ah.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });
    }
    else if (formData.role === "admin") {
      response = await fetch("https://chatbot-f4ah.onrender.com/api/v1/admin/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });
    }
    const result = await response.json();
    // console.log("result ", result);
    const Token = result.Token;
    localStorage.setItem("Token", Token);

    alert(result.message);
     if(Token){

      // set admin as true
      if(formData.role ==="admin")
        {
      localStorage.setItem("isAdmin" , "true")
      //set user as false
    }else if(formData.role ==="user")
      {
        (localStorage.setItem("isAdmin" , "false"));
      }
    navigate('/chatbot');}
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className=" login-card shadow-lg">
        <Card.Body>
          <h3 className="text-center mb-4">🌾 Gramin Chatbot Login</h3>

          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formRole">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Button
              variant="success"
              type="submit"
              className="w-100 py-2 custom-btn"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
