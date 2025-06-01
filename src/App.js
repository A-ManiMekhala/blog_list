import React from "react";
import blogPosts from "./blogPosts";
import "./App.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Posts</h1>
      </header>
      <main className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-item">
            <p>By {post.author}</p>
            <small>Published on {formatDate(post.date)}</small>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
