import './Home.css';
import Login from '../../components/Login/Login';
import {useContext} from 'react';
import { UserLogin } from '../../App';

const Home = () => {
    const {loggedIn, setLoggedIn, username, setUsername} = useContext(UserLogin);
    const handleLogin = () => {
        setLoggedIn(true);
    }
    return (
        <>
            <div className='pageContainer'>
                <h1>Album Saver</h1>
                <p>A new way to save albums...</p>
                <Login setLogin={handleLogin} setUser={setUsername} />
            </div>
        </>
    )
}

export default Home;