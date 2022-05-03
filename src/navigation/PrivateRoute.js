import React, {useContext} from 'react'
import { Navigate, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function PrivateRoute ({component: Component, ...rest}) {

    const {loggedIn, user} = useContext(AuthContext)    

    return loggedIn ? <Component/> : <Navigate to='/'/>
}

export default PrivateRoute