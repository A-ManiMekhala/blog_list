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
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <small>{formatDate(post.date)}</small>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
