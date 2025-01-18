import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'; 
import { motion } from 'motion/react'
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/login', { name: username, password: password })
            login({username, password})
            navigate('/profile');
        } catch (error) {
            console.error("There was an error logging in", error);
            alert('Login failed, please try again')
        }
    }
    return (
        <motion.div 
            className='loginDiv'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className='loginTitle'>Login</h1>
            <form onSubmit={handleSubmit} className='loginForm'>
                <input type="text" className='loginInput' required placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <input type="password" className='loginInput' required placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <motion.button
                    type='submit'
                    className='login-submit-btn'
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    Login
                </motion.button>
            </form>
        </motion.div>
    )
}
export default Login;