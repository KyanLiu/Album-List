import './Home.css';
import { useRef } from 'react';
import Register from '../../components/Register/Register';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';

const Home = () => {
    const { user } = useAuth();
    const registerRef = useRef(null);

    const getStarted = () => {
        registerRef.current.scrollIntoView({ behavior: 'smooth'});
    }
    return (
        <>
            <section className='hero'>
                <div className='heroContainer'>
                    <motion.h1 
                        className='hero-title'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        viewport={{ amount: 'all', once: true }}
                    >
                        MyAlbumList
                    </motion.h1>
                    <motion.p 
                        className='hero-text'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.3, delay: 0.5 }}
                        viewport={{ amount: 'all', once: true }}
                    >
                        A new way to save albums
                    </motion.p>
                    {user ? 
                        <motion.p 
                            className='hero-txt'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.3, delay: 0.7 }}
                        >Welcome, {user.username}</motion.p> :
                        <motion.button 
                            className='hero-btn' 
                            onClick={getStarted}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.3, delay: 0.5 }}
                            viewport={{ amount: 'all', once: true }}
                        >Get Started
                        </motion.button>}
                    <motion.div
                        className='hero-line' 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.3, delay: 0.5 }}
                        viewport={{ amount: 'all', once: true }}
                    >
                    </motion.div>
                </div>
            </section>
            <section className='registerSection' ref={registerRef}>
                <div className='registerContainer'>
                    <Register />
                </div>
            </section>
            <div className='contact-container'>
                <div className='contact-footer'>
                    <p className='contact-item'>Contact us</p>
                    <a className='contact-item'>kyanliu9@gmail.com</a>
                </div>
            </div>
        </>
    )
}

export default Home;