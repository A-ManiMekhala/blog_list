// BlogForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogPosts from "./blogPosts"; // optional if you're modifying in-memory

const BlogForm = ({ isEditing = false, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingPost = isEditing
    ? blogPosts.find((p) => p.id.toString() === id)
    : null;

  const [title, setTitle] = useState(existingPost?.title || "");
  const [content, setContent] = useState(existingPost?.content || "");
  const [author, setAuthor] = useState(existingPost?.author || "");
  const [date, setDate] = useState(existingPost?.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: isEditing ? Number(id) : Date.now(),
      title,
      content,
      author,
      date,
      summary: content.substring(0, 100), // simple summary from content
    };

    onSave(newPost, isEditing);
    navigate("/");
  };

  return (
    <div className="App">
      <h2>{isEditing ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Publication Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isEditing ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
