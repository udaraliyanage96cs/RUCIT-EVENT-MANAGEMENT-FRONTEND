import React from 'react'
import API from '../api/api'
import { Link, useNavigate } from 'react-router-dom'

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
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
                <span className="navbar-brand">Evenet Manager</span>
                 <div className="collapse navbar-collapse d-flex justify-content-between">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/my-events">My Events</Link>
                        </li>
                    </ul>
                </div>
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
