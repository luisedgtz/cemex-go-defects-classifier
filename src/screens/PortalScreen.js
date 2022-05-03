import React, { useContext } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import NavBar from '../navigation/NavBar'

const PortalScreen = () => {
    // const {user} = useContext(AuthContext)
    
    return (
        <div>
            <NavBar/>
        </div>
    )
}

export default PortalScreen