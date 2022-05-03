import React, {createContext,useState,useEffect} from 'react'
import {setToken, getToken, deleteToken} from './authHelpers'

import axios from 'axios';

export const AuthContext = createContext();

const baseUrl = 'http://localhost:3000'

export const AuthProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        async function loadUser(){
            if(!getToken()){
                return
            }
            try{
                console.log("logged in")
                // const response = await axios.get("http://localhost:3000/api/getbytoken", {
                //     params:{
                //         "token": getToken() 
                //     }
                // })
                // setUser(data.data[0])
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
                    try {
                        const response = await axios.post(`${baseUrl}/users/login`, {
                            "email": email,
                            "password": password
                        })
                        if (response.status=== 200) {
                            setUser(response.data)
                            setToken(response.data.token)
                            setLoggedIn(true);
                        } else {
                            throw new Error("an error has occurred")
                        }
                    } catch (error) {
                        console.log(error)
                        alert(error.response.data)
                    } 
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