import React, { useState } from 'react'
import SignUp from '../components/auth/SignUp'
import Login from '../components/auth/Login'
const AuthPage = (props) => {
  const [authType,setAuthType] = useState('login')
  function typeSwitch(value)
  {
    setAuthType(value)
  }
  return (
    <div>
      {
        authType==='login' ?<Login mode={typeSwitch} change={props.change}/>: <SignUp mode={typeSwitch} change={props.change} />
      }
    </div>
    
  )
}

export default AuthPage;