// // BlogDetailPage.js
// import React from "react";
// import { useParams } from "react-router-dom";
// import blogPosts from "./blogPosts";
// import BlogPostDetail from "./BlogPostDetail";

// const BlogDetailPage = () => {
//   const { id } = useParams();
//   const post = blogPosts.find((p) => p.id.toString() === id);

//   return post ? (
//     <BlogPostDetail
//       title={post.title}
//       content={post.content}
//       author={post.author}
//       date={post.date}
//     />
//   ) : (
//     <p>Blog post not found.</p>
//   );
// };

// export default BlogDetailPage;

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BlogPostDetail from "./BlogPostDetail";

const BlogDetailPage = ({ posts, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 💡 Guard if posts are not yet available
  if (!posts || !Array.isArray(posts)) {
    return <p>Loading...</p>;
  }

  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <p>Post not found</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "1rem", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Blog Posts</h1>
        <Link to={`/edit/${post.id}`}>
          <button
            style={{
              background: "royalblue",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            Edit Post
          </button>
        </Link>
      </div>

      <BlogPostDetail
        title={post.title}
        content={post.content}
        author={post.author}
        date={post.date}
      />

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0.75rem 2rem",
            fontWeight: "bold",
            borderRadius: "4px",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetailPage;
