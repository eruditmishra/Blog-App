import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Registerpage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  console.log(process.env.NODE_ENV);

  const register = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      response.json().then((userInfo) => {
        // Store the token in local storage
        localStorage.setItem("token", userInfo.accessToken);
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("registration failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="userName"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default Registerpage;
