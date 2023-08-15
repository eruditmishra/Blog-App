import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-app-backend-p802.onrender.com/api/post").then(
      (response) => {
        response.json().then((posts) => {
          console.log("Posts", posts);
          setPosts(posts);
        });
      }
    );
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default Homepage;
