import React from 'react'
import API from '../api/api'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await API.post("/logout");
        } catch (error) {
            
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark px-3">
                <span className="navbar-brand">Evenet Manager</span>
                {user && (
                    <div className='d-flex align-items-center'>
                        <span className='text-white me-3'>{user.name}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
                    </div>
                )}
            </nav>
        </div>
    )
}
