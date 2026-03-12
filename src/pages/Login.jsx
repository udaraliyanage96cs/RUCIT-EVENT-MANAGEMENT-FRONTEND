import { useState } from 'react'
import API from '../api/api'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = async (e) => {
        setForm({...form , [e.target.name]: e.target.value})
    }

    const handelLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/login", form);
            console.log("res",res);
            if(res.data.token != undefined){
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                console.log("usrr",res.data.user);
                if(res.data.user.role === "admin"){
                    navigate("/dashboard");
                }else{
                    navigate("/");
                }
            }else{
                alert(res.data.message);
            }
           
        } catch (error) {
            setError("Invalid email or password");
        }
    }

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <h3>Login User</h3>
                {error && (<div className="alert alert-danger">{error}</div>)}
                <form onSubmit={handelLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handleChange} required />
                    </div>
                    <button className="btn btn-primary">
                        Login
                    </button>
                </form>


                <p className='text-center mt-3 mb-0'>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}
