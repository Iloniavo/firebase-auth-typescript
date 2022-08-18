import React from 'react';
import { signOut} from 'firebase/auth'
import auth from '../config/config';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();
    const logout = ()=> {
    signOut(auth) 
    console.log('out');
    navigate('/login')
   }

    return(
            <div>
                <p>Welcome to home page</p>
                <button onClick={logout}>Sign out</button>
            </div>
    )
}