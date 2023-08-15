import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const userName = userInfo?.userName;

  const logout = () => {
    fetch("https://blog-app-backend-p802.onrender.com/users/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token"); // Remove the token from local storage
          setUserInfo(null);
        } else {
          throw new Error("Unable to logout");
        }
      })
      .catch((error) => {
        console.log("Error while logging out:", error);
      });
  };

  const fetchUserProfile = () => {
    fetch("https://blog-app-backend-p802.onrender.com/users/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Got a response");
          return response.json();
        } else {
          throw new Error("Unable to fetch user profile data");
        }
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.log("Error while fetching user data", error);
      });
  };

  useEffect(() => {
    // Check if there's a token in local storage and set it in the headers for future requests
    const token = localStorage.getItem("token");
    console.log("Token in ls:.........", token);

    if (token) {
      // Set the token in request headers
      fetchUserProfile(); // Fetch user profile with the stored token
    }
  }, []);

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userName && (
          <>
            <Link to="/create">Create New Post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
