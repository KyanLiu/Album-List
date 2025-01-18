import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Join from './pages/Join/Join';

function App() {
  return (
    <>
      <Router classname="container">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/join" element={<Join/>}></Route>
            <Route path="/*" element={<h1>Page Not Found</h1>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
