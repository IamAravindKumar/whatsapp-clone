import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import "./Login.css";


function Login() {
  const [_, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user
        })
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"
          alt="logo"
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
