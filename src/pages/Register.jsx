import { useState } from 'react'
import API from '../api/api'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate();
    const [from, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [error, setError] = useState("");

    const handelChange = async (e) => {
        setForm({ ...from, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post("/register", from);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    }
    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <h3>Register User</h3>
                {error && (<div className="alert alert-danger">{error}</div>)}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={handelChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={handelChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handelChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="password_confirmation" name='password_confirmation' onChange={handelChange} required />
                    </div>
                    <button className="btn btn-primary">Register</button>
                </form>

                <p className='text-center mt-3 mb-0'>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}
