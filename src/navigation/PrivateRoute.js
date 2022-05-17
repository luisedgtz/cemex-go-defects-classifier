import React, {useContext} from 'react'
import { Navigate, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function PrivateRoute ({children}) {

    const {loggedIn, user} = useContext(AuthContext)    

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return children
}

export default PrivateRoute