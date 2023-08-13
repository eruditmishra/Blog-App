import React, { useState } from "react";

const Registerpage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration Successfule");
    } else {
      alert("registration failed");
    }
  };
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
