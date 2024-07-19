import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [name, setName] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name);
        props.setUser(name);
        props.setLogin();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { name })
        } catch (error) {
            console.error("There was an error logging in", error);
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Username:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                </label>
                <input type='submit'></input>
            </form>
        </>
    )
}
export default Login;