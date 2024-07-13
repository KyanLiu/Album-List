import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert(`The name you entered was: ${name}`);
        try {
            const response = await axios.post('/api/login', { name })
            setToken(response.data.token);
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