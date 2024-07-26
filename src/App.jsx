import {useState, useEffect, createContext}  from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Logout from './pages/Logout/Logout';
import axios from 'axios';
import { Buffer } from 'buffer';

export const UserLogin = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/client-id');
          const client_id = response.data.clientId, client_secret = response.data.clientSecret;
          const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
          const token = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
              grant_type: 'client_credentials'
          }), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Basic ${authString}`
              }
          })
          setAccessToken(token.data.access_token);
      }
      catch (error) {
          console.error('Error getting Access Key', error);
      }
    }
    fetchApiKey();
    const userSaved = JSON.parse(localStorage.getItem('username'));
    if(userSaved){
      setUsername(userSaved);
      setLoggedIn(true);
      console.log('Retrieved Username of ', userSaved);
    }
  }, []);
  useEffect(() => {
    if(loggedIn){
      localStorage.setItem('username', JSON.stringify(username))
      console.log('Local Storage Username is set to', username);
      console.log(loggedIn, username, accessToken);
    }
  }, [username]);

  return (
    <>
      <UserLogin.Provider value={{loggedIn, setLoggedIn, username, setUsername, accessToken, setAccessToken}} >
        <Router classname="container">
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/search" element={<Search/>}></Route>
              <Route path="/logout" element={<Logout/>}></Route>
          </Routes>
        </Router>
      </UserLogin.Provider>
    </>
  )
}

export default App
