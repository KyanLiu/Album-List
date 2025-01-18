import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import './Register.css';
import axios from 'axios';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [altpassword, setAltPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const uid = () => 
        String(
            Date.now().toString(32) +
            Math.random().toString(16)
        ).replace(/\./g, '')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== altpassword){
            alert('The passwords do not match. Try again.');
            setPassword(''),setAltPassword('');
            return
        }
        try {
            const id = uid();
            await axios.post('http://localhost:5000/api/auth/register',
                { username, password, id }
            )
            login({username, id});
            alert("Account has successfully been made");
            navigate('/profile')
        } catch (error) {
            if(error.response && error.response.status == 400 && error.response.data.error == 'User already exists'){
                alert('A user with the same name already exists. Try another username.')
                setUsername(''), setPassword(''), setAltPassword(''), setEmail('');
            }
            console.error('There was an error registering', error);
        }
    }

  return (
    <div className='registerDiv'>
        <h1 className='registerTitle'>Register</h1>
        <form onSubmit={handleSubmit} className='registerForm'>
            <div className='registerInputDiv'>
                <input type="text" required className='registerInput' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <input type="text" className='registerInput' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <input type="password" required className='registerInput' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <input type="password" required className='registerInput' placeholder='Confirm Password' value={altpassword} onChange={(event) => setAltPassword(event.target.value)}></input>
            </div>
            <div className='registerButtonDiv'>
                <motion.button 
                    type="submit" 
                    className='register-submit-btn'
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    Submit
                </motion.button>
                <motion.button
                    className='register-login-btn' 
                    onClick={() => navigate('/join')}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    Login
                </motion.button>
            </div>
        </form>
    </div>
  )
}

export default Register