import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Loginpage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://blog-app-backend-p802.onrender.com/users/login",
      {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.ok) {
      response.json().then((userInfo) => {
        // Store the token in local storage
        localStorage.setItem("token", userInfo.accessToken);
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="userName"
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Login</button>
    </form>
  );
};

export default Loginpage;
