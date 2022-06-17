import React, {createContext,useState,useEffect} from 'react'
import {setToken, getToken, deleteToken} from './authHelpers'

import axios from 'axios';

export const AuthContext = createContext();

const baseUrl = 'http://localhost:3000'

export const AuthProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null)
    const [savedReport, setSavedReport] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    
    useEffect(() => {
        async function loadUser(){
            if(!getToken()){
                return
            }
            try{
                const response = await axios.get(`${baseUrl}/users/getuserbytoken`, {
                    params: {
                        "token": getToken()
                    }
                })
                if (response.status === 200) {
                    setUser(response.data)
                    setLoggedIn(true)
                }
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
                savedReport,
                setSavedReport,
                activeStep,
                setActiveStep,
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
                            return {error: 0, message: "success"}
                        } else {
                            throw new Error("an error has occurred")
                        }
                    } catch (error) {
                        return {error: 1, message: error.response.data}
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