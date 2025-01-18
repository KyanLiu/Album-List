import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider( {children} ){ // auth wraps the children/the app
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('username');
    }

    useEffect(() => {
        if(user){
            localStorage.setItem('username', JSON.stringify(user));
        }
    }, [user])

    useEffect(() => {
        const userSaved = JSON.parse(localStorage.getItem('username'));
        if(userSaved){
            setUser(userSaved);
            console.log('Retrieved Username of ', userSaved);
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}