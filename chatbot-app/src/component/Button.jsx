import React from 'react';
import { useNavigate } from 'react-router-dom';




const Button = () => {
    const navigate = useNavigate();
    const nav_handle = () => {
        console.log("i am clicked");
        navigate('/signup');
    }
    return (
        <ul>
            <li>
                <Link onClick={nav_handle} to='/login'>Login</Link>
            </li>
        </ul>
    )
}

//component exporting
export default Button;