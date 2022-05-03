import React, {useContext} from 'react'
import { Navigate, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function PrivateRoute ({component: Component, ...rest}) {

    const {loggedIn} = useContext(AuthContext)    

    return(
        <Route {...rest} render={(props) =>(
            loggedIn === false
            ? <Component {...props}/>
            : <Navigate to = '/portal/home'/>
        )}/>
    )
}

export default PrivateRoute