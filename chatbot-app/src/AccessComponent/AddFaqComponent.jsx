import {Navigate , Outlet} from "react-router-dom" ;

const FaqGate = () =>{
    const isAdmin = localStorage.getItem('isAdmin')==="true";
  return  isAdmin ? <Outlet /> : <Navigate to="/" />;
}

//component exporting

export default FaqGate ;