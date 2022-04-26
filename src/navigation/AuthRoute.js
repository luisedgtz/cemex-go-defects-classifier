import React, {useContext} from 'react'
import { Redirect, Route} from 'react-router'
import { AuthContext } from './AuthProvider'

function PrivateRoute ({component: Component, ...rest}) {

    const {loggedIn} = useContext(AuthContext)    

    return(
        <Route {...rest} render={(props) =>(
            loggedIn === false
            ? <Component {...props}/>
            : <Redirect to = '/portal/home'/>
        )}/>
    )
}

export default PrivateRoute