import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa' 
import {deleteUserNExpenses, logoutUser} from '../api'
import './Navbar.css';
const Navbar = ({setAuth}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    //const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        await logoutUser();
        localStorage.removeItem('token');
        setAuth(false);
    };

    const handleProfileDelete = async () => {
        await deleteUserNExpenses();
        localStorage.removeItem('token');
        setAuth(false);
    };

    return (
        <div className='navbar'>
            <div className='logo'>
                EXPENSE T₹ACKER
            </div>
            <div className='burger' onClick={toggleMenu}>
                {menuOpen ? <FaTimes className='burger-icon'/> : <FaBars className='burger-icon'/>}
            </div>
            <div className={`dropdown-menu ${menuOpen ?'show' : ''}`}>
                <ul>
                    <li onClick={handleLogout}> Logout </li>
                    <li onClick={handleProfileDelete}> Delete Profile </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar