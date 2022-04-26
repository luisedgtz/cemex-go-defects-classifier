import React, {createContext,useState,useEffect} from 'react'
import {setToken, getToken, deleteToken} from './authHelpers'

import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        async function loadUser(){
            if(!getToken()){
                return
            }

            try{
                const data = await axios.get("http://localhost:3000/api/getbytoken", {
                    params:{
                        "token": getToken() 
                    }
                })
                setUser(data.data[0])
                setLoggedIn(true)
            } catch(error){
                console.log(error)
            }
        }

        loadUser()
    },[])

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                user,
                setUser,
                login: async (email, password)=> {
                    var response;
                    await axios.get("http://localhost:3000/users/login",{
                        params:{
                            "email": email,
                            "password": password
                        }
                    }).then(res => {
                        console.log(res)
                        // if(res.data.length === 1){
                        //     setUser(res.data[0])
                        //     setToken(res.data[0].accessToken)
                        //     setLoggedIn(true);
                        //     response = 1
                        // }else{
                        //     response = 0
                        // }
                    })
                    return response
                },
                logout: async () =>{
                    setLoggedIn(false)
                    setUser(null)
                    deleteToken()
                }
                
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}