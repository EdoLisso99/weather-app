import React from 'react'
import "./Navbar.css"

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar__city">
                Milan, <small>Italy</small>
            </div>
            <div className="navbar__searchbr">Hypothetical searchbar</div>
        </div>
    )
}

export default NavBar
