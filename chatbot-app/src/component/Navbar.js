import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("isAdmin");
        setIsMobileMenuVisible(false);
        navigate('/login');
    };

    const toggleMobileMenu = () => setIsMobileMenuVisible(!isMobileMenuVisible);
    const closeMenu = () => setIsMobileMenuVisible(false);

    const isLoggedIn = localStorage.getItem("Token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const navbarStyles = `
        :root {
            --primary: #6366f1;
            --dark: #0f172a;
            --light: #f8fafc;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar {
            background: var(--dark);
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
        }

        .logo h3 {
            margin: 0;
            font-size: 1.5rem;
            letter-spacing: -0.5px;
            background: linear-gradient(90deg, #fff, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Fixed Hamburger Position */
        .mobile-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            z-index: 1001;
        }

        .bar {
            width: 28px;
            height: 3px;
            background-color: white;
            border-radius: 10px;
            transition: var(--transition);
        }

        /* Nav Links Styling */
        .nav-menu ul {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0;
            padding: 0;
        }

        .nav-menu a, .nav-logout {
            color: #cbd5e1;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            position: relative;
            transition: var(--transition);
            font-size: 0.95rem;
            background: none;
            border: none;
            cursor: pointer;
        }

        /* Hover Animation */
        .nav-menu a:hover {
            color: white;
            transform: translateY(-2px);
        }

        /* Active Link Indicator */
        .nav-menu a.active {
            color: var(--primary);
        }

        .nav-menu a.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 16px;
            right: 16px;
            height: 2px;
            background: var(--primary);
            border-radius: 2px;
        }

        .nav-logout {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border-radius: 6px;
        }

        .nav-logout:hover {
            background: #ef4444;
            color: white;
        }

        /* Mobile Viewports */
        @media screen and (max-width: 767px) {
            .mobile-toggle {
                display: flex;
                position: absolute;
                right: 20px; /* Forces it to the right corner */
            }

            .nav-menu {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background: #1e293b;
                transition: var(--transition);
                padding-top: 80px;
                box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            }

            .nav-menu.active {
                right: 0;
            }

            .nav-menu ul {
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
            }

            .nav-menu a, .nav-logout {
                width: 100%;
                padding: 15px 30px;
                font-size: 1.1rem;
            }

            /* Hamburger animation when active */
            .nav-menu.active ~ .mobile-toggle .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
            .nav-menu.active ~ .mobile-toggle .bar:nth-child(2) { opacity: 0; }
            .nav-menu.active ~ .mobile-toggle .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        }
    `;

    return (
        <header className='navbar'>
            <style>{navbarStyles}</style>
            <div className='container'>
                <div className='logo'>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <h3>Gramin Chatbot</h3>
                    </Link>
                </div>

                <nav className={`nav-menu ${isMobileMenuVisible ? 'active' : ''}`}>
                    <ul>
                        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                        {isLoggedIn ? (
                            <>
                                {isAdmin ? (
                                    <li><NavLink to="/addfaq" onClick={closeMenu}>Post FAQ</NavLink></li>
                                ) : (
                                    <>
                                        <li><NavLink to="/profile" onClick={closeMenu}>Profile</NavLink></li>
                                        <li><NavLink to="/my-schemes" onClick={closeMenu}>My Schemes</NavLink></li>
                                        <li><NavLink to="/view-profile" onClick={closeMenu}>View Profile</NavLink></li>
                                    </>
                                )}
                                <li>
                                    <button className='nav-logout' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/signup" onClick={closeMenu}>Signup</NavLink></li>
                                <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>

                <div className='mobile-toggle' onClick={toggleMobileMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;