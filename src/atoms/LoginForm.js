import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import Logo from "../media/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import TextField from '@mui/material/TextField';

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
   
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();
    
    setLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      // Save email and password to local storage (not recommended for production)
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem("userName", userData.displayName)

      navigate("/dashboard", { state: { user:userData } });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="login-holder">
        <div className="well">
          <div className="logo-holder-login">
            <img className="login-logo" src={Logo} alt="Logo" />
          </div>
          <form onSubmit={handleLogin} className="material-form">
            <div className="form-group">
              <TextField
                sx={{ mt: 3 }}
                onChange={handleEmail}
                value={email}
                type="email"
                className="material-ui"
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handlePassword}
                value={password}
                type="password"
                className="material-ui"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
            <p className="helper-text">
              Don't have an account? <a href="#">Contact Support</a> here.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
