// import React from "react";
// import blogPosts from "./blogPosts";
// import "./App.css";

// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString();
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Blog Posts</h1>
//       </header>
//       <main className="blog-list">
//         {blogPosts.map((post) => (
//           <article key={post.id} className="blog-item">
//             <p>By {post.author}</p>
//             <small>Published on {formatDate(post.date)}</small>
//             <h3>{post.title}</h3>
//             <p>{post.summary}</p>
//           </article>
//         ))}
//       </main>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import blogPosts from "./blogPosts";
// import BlogDetailPage from "./BlogDetailPage";
// import "./App.css";

// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString();
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Blog Posts</h1>
//       </header>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <main className="blog-list">
//               {blogPosts.map((post) => (
//                 <article key={post.id} className="blog-item">
//                   <p>By {post.author}</p>
//                   <small>Published on {formatDate(post.date)}</small>
//                   <h3>
//                     <Link to={`/post/${post.id}`}>{post.title}</Link>
//                   </h3>
//                   <p>{post.summary}</p>
//                 </article>
//               ))}
//             </main>
//           }
//         />
//         <Route path="/post/:id" element={<BlogDetailPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import BlogDetailPage from "./BlogDetailPage";
// import BlogForm from "./BlogForm";
// import blogPostsData from "./blogPosts";
// import "./App.css";

// function App() {
//   const [posts, setPosts] = useState(blogPostsData);

//   const handleSavePost = (post, isEditing) => {
//     if (isEditing) {
//       setPosts(posts.map((p) => (p.id === post.id ? post : p)));
//     } else {
//       setPosts([...posts, post]);
//     }
//   };

//   const handleDeletePost = (id) => {
//     setPosts(posts.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Blog Posts</h1>
//         <Link to="/create">Create New Post</Link>
//       </header>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <main className="blog-list">
//               {posts.map((post) => (
//                 <article key={post.id} className="blog-item">
//                   <p>By {post.author}</p>
//                   <small>
//                     Published on {new Date(post.date).toLocaleDateString()}
//                   </small>
//                   <h3>
//                     <Link to={`/post/${post.id}`}>{post.title}</Link>
//                   </h3>
//                   <p>{post.summary}</p>
//                   <Link to={`/edit/${post.id}`}>Edit</Link>
//                 </article>
//               ))}
//             </main>
//           }
//         />
//         <Route path="/post/:id" element={<BlogDetailPage />} />
//         <Route path="/create" element={<BlogForm onSave={handleSavePost} />} />
//         <Route
//           path="/edit/:id"
//           element={<BlogForm isEditing onSave={handleSavePost} />}
//         />
//         <Route
//           path="/post/:id"
//           element={<BlogDetailPage posts={posts} onDelete={handleDeletePost} />}
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import blogPostsData from "./blogPosts";
import BlogDetailPage from "./BlogDetailPage";
import BlogForm from "./BlogForm";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(blogPostsData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSavePost = (post, isEditing) => {
    if (isEditing) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } else {
      setPosts([...posts, post]);
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.summary?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term)
    );
  });

  function highlightText(text, search) {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Posts</h1>

        <div className="nav-buttons">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>

          <Link to="/">
            <button className="home-btn">Home</button>
          </Link>

          <Link to="/create">
            <button className="create-btn">Create New Post</button>
          </Link>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="blog-list">
              {posts.map((post) => (
                <article key={post.id} className="blog-item">
                  <p>By {post.author}</p>
                  <small>
                    Published on {new Date(post.date).toLocaleDateString()}
                  </small>
                  {/* <h3>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.summary}</p> */}
                  <h3>
                    <Link to={`/post/${post.id}`}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(post.title, searchTerm),
                        }}
                      />
                    </Link>
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: highlightText(post.summary, searchTerm),
                    }}
                  />
                </article>
              ))}
            </main>
          }
        />
        <Route path="/create" element={<BlogForm onSave={handleSavePost} />} />
        <Route
          path="/edit/:id"
          element={<BlogForm onSave={handleSavePost} isEditing />}
        />
        <Route
          path="/post/:id"
          element={<BlogDetailPage posts={posts} onDelete={handleDeletePost} />}
        />
      </Routes>

      <footer className="footer">© 2025 Blog App. All rights reserved.</footer>
    </div>
  );
}

export default App;
