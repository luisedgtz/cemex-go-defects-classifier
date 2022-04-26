import React, {useContext, useState} from 'react'
import CemexLogo from "../assets/cemex_logo.svg";
import LoginIllustration from "../assets/login_illustration.svg";

import { FiLock } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

import {AuthContext} from '../navigation/AuthProvider'

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("pError")

  const [passwordVisible, setPasswordVisible] = useState(false)

  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Hola")
    var response = await login(email, password)
    if(response === 0){
      console.log("error")
      setError("pError-visible")
  }
  }

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className='main-container'>
      <div className='side-left'>
        <img className='side-left-logo' src={CemexLogo}/>
        <img className='side-left-illustration' src = {LoginIllustration}/>
      </div>

      <div className='side-right'>

        <h3 className='color-main'>Welcome to CEMEX GO Classifier!</h3>
        <h6 className='color-secondary'>Login with your assigned credentials</h6>

        <form className='login-form'>

          <div className='user-input'>
            <label className='label text'>E-mail</label>
            <div className='input-box'>
              <FiUser/>
              <input 
                placeholder='user@mail.com' 
                value={email} 
                onChange={(e)=> {
                  setEmail(e.target.value)
                }} 
                id='e-mail'
                type="email"
                name='email'/>
            </div>
          </div>

          <div className='user-input'>
            <label className='label text'>Password</label>
            <div className='input-box'>
              <FiLock/>
              <input 
                type={passwordVisible ? "text" : "password"}
                id='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>
              {
                passwordVisible ? 
                <FiEyeOff
                  className='clickable'
                  onClick={() => handlePasswordVisibilityToggle()}
                />
                :
                <FiEye
                  className='clickable'
                  onClick={() => handlePasswordVisibilityToggle()}
                />
              }
            </div>
          </div>

          <input 
            className='button'
            type='submit'
            onClick={(e)=>handleLogin(e)}
            value="LOGIN"/>
        </form>
      </div>
    </section>
  )
}

export default LoginScreen