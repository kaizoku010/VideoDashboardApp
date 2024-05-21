import React from 'react'
import "./LoginForm.css"
import Logo from "../media/logo.png"
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div>

<div class="login-holder">
    <div class="well">
      <div class="logo-holder-login">
        <img class="login-logo" src={Logo}/>
      </div>
      <form class="material-form">
        <div class="form-group">
          <input type="email" class="form-control" />
          <label style={{color:"#666767"}}>Email</label>
          <span class="input-border"></span>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" />
          <label style={{color:"#666767"}}>Password</label>
          <span class="input-border"></span>
        </div>
        <Link to="/">
          <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </Link>
        <p class="helper-text">Don't have an account? <a href="#">Contact Support</a> here.</p>
      </form>
    </div>
  </div>
    </div>
  )
}

export default LoginForm