import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from '../navigation/AuthProvider'
import AuthRoute from '../navigation/AuthRoute'
import PrivateRoute from '../navigation/PrivateRoute'

import LoginScreen from './LoginScreen'
import PortalScreen from './PortalScreen'


const Application = () => {
    const { user, loggedIn} = useContext(AuthContext)

    return (
        <Routes>
            <Route index element={<LoginScreen/>}/>
            <Route 
                path="/login" 
                element={
                    <AuthRoute>
                        <LoginScreen/>
                    </AuthRoute>
                }/>
            <Route 
                path="/portal"
                element={
                    <PrivateRoute>
                        <PortalScreen/>
                    </PrivateRoute>
                }
            />
            <Route path='*' element={<p>There's nothing here: 404!</p>}/>
        </Routes>
    )
}

export default Application