import {useState, createContext}  from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

export const UserLogin = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  return (
    <>
      <UserLogin.Provider value={{loggedIn, setLoggedIn, username, setUsername}} >
        <Router classname="container">
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/search" element={<Search/>}></Route>
          </Routes>
        </Router>
      </UserLogin.Provider>
    </>
  )
}

export default App
