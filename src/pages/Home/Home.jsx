import './Home.css';
import Login from '../../components/Login/Login';

const Home = () => {
    return (
        <>
            <div className='pageContainer'>
                <h1>Album Saver</h1>
                <p>A new way to save albums...</p>
                
                <Login />

            </div>
        </>
    )
}

export default Home;