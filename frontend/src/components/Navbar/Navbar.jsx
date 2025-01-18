import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { motion } from 'framer-motion';
import profilePicture from '../../assets/img/profile.svg';
import searchPicture from '../../assets/img/search.svg';
import logoutPicture from '../../assets/img/logout.svg';
import homePicture from '../../assets/img/home.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='navbarContainer'>
            <nav className='navbar'>
                <motion.div
                    onClick={() => setIsOpen(!isOpen)} 
                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                    whileHover={{ scale: 1.1 }}
                    className={`menu-icon ${isOpen ? 'active' : ''}`} 
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </motion.div>
            </nav>
            <div className={`navContainer ${isOpen ? 'active' : ''}`}>
                <NavLink to="/" className='navItem'>
                    <img src={homePicture} className='navImg' alt='Home' title='Home'></img>
                </NavLink>
                <NavLink to="/profile" className='navItem'>
                    <img src={profilePicture} className='navImg' alt='Profile' title='Profile'></img>
                </NavLink>
                <NavLink to="/search" className='navItem'>
                    <img src={searchPicture} className='navImg' alt='Search' title='Search'></img>
                </NavLink>
                <NavLink to="/join" className='navItem'>
                    <img src={logoutPicture} className='navImg' alt='Logout' title='Logout'></img>
                </NavLink>
            </div>
        </div>
    )
}
export default Navbar;