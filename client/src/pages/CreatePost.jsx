import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const createNewPost = async (event) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    console.log(files);
    event.preventDefault();
    const response = await fetch(
      "https://blog-app-backend-p802.onrender.com/api/post",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      // Redirect to the home page after successful post creation
      navigate("/");
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder={`Title`}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder={`Summary`}
        value={summary}
        onChange={(event) => {
          setSummary(event.target.value);
        }}
      />
      <input type="file" onChange={(event) => setFiles(event.target.files)} />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(value) => setContent(value)}
      />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
