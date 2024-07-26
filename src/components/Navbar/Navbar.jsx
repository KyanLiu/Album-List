import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();    
    const hoverStyle = (path) => {
        return location.pathname === path ? true : false;
    };
    return (
        <div className='navContainer'>
            <Link to="/" className={hoverStyle('/') ? 'navItem active' : 'navItem'}>Home</Link>
            <Link to="/profile" className={hoverStyle('/profile') ? 'navItem active' : 'navItem'}>Profile</Link>
            <Link to="/search" className={hoverStyle('/search') ? 'navItem active' : 'navItem'}>Search</Link>
            <Link to="/logout" className={hoverStyle('/logout') ? 'navItem active' : 'navItem'}>Log Out</Link>
        </div>
    )
}
export default Navbar;