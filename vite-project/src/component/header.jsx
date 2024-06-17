import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='container-fluid text-light bg-dark text-center p-3'>
                <h1>Larussos Motors</h1>
                <h2>Your one stop shop for all your car needs</h2>
                    <ul>
                        <li className='nav-item'><NavLink className='nav-link' to='/'>Home</NavLink></li>
                        <li className='nav-item'><NavLink className='nav-link' to='/Buy'>Buy</NavLink></li>
                        <li className='nav-item'><NavLink className='nav-link' to='/Sell'>Sell</NavLink></li>
                        <li className='nav-item'><NavLink className='nav-link' to='/Services'>Services</NavLink></li>
                    </ul>
                    <div className='login-Button'>
                        <button>Login</button>
                    </div>
            </div>
        </>
    )
}

export default Header;
