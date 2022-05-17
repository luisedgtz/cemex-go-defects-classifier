import React, {useContext} from 'react'
import { Navigate, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function AuthRoute ({children}) {

    const {loggedIn, user} = useContext(AuthContext)    

    if (user) {
        return <Navigate to="/portal" replace/>
    }

    return children
}

export default AuthRoute