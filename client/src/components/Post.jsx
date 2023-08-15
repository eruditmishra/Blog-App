import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, content, createdAt, author, _id }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/post/id"}>
          <img
            src={`https://blog-app-backend-p802.onrender.com/` + cover}
            alt=""
          />
        </Link>
      </div>
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author" href="/">
            {author.userName}
          </a>
          <time>{format(new Date(createdAt), `dd-MMM-yyyy`)}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
