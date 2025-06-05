// BlogDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";
import blogPosts from "./blogPosts";
import BlogPostDetail from "./BlogPostDetail";

const BlogDetailPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id.toString() === id);

  return post ? (
    <BlogPostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  ) : (
    <p>Blog post not found.</p>
  );
};

export default BlogDetailPage;
