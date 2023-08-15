import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams, Navigate } from "react-router-dom";

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

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blog-app-backend-p802.onrender.com/api/post/" + id).then(
      (resposnse) => {
        resposnse.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await fetch("http://localhost:4000/api/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={updatePost}>
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
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
};

export default EditPost;
