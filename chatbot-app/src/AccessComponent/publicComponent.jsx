import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("Token");
  return token ? <Navigate to="/chatbot" /> : children;
};

export default PublicRoute;
