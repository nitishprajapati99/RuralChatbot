import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    // const isAdmin = localStorage.getItem("isAdmin");
    const isAuthorizedUser = localStorage.getItem('Token');
    // console.log('auth',isAuthorizedUser);
    return isAuthorizedUser ? <Outlet /> : <Navigate to='/login' />

}
export default PrivateComponent;  