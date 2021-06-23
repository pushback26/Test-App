import React from 'react';
import { Link } from 'react-router-dom'


function Navbar ({ products }) {
    return (
        <nav className="nav-wrapper red darken-2">
            <div className="container">
                <a href="" className="brand-logo">E&B Store</a>
                <ul className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart"><i class="large material-icons">shopping_cart <span class="badge">{products.quantity}</span></i></Link></li>
                </ul>
                
            </div>
        </nav>
    )

}
export default Navbar;