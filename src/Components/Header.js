import React from 'react'
import bg from '../images/US-Soccer-Federation.jpg';
import './Header.css'
const Header = ({ type, data }) => {
    return (

        <div className="Header">
            <img
                className="bg"
                src={bg}
                alt=""
            />
            <div className="content">
                {type === "logo" ? <img src={data.logo} alt="" /> : <h2>{data.title}</h2>}
            </div>
        </div>


    )
}

export default Header
