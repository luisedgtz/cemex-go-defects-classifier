import React, {useContext} from 'react'
import { Redirect, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function PrivateRoute ({component: Component, ...rest}) {

    const {loggedIn, user} = useContext(AuthContext)    

    return(
        <Route {...rest} render={(props) =>(
            loggedIn === true
            ? <Component {...props}/>
            : <Redirect to = '/login'/>
        )}/>
    )
}

export default PrivateRoute