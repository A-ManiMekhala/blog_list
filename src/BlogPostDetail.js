import React from "react";
import PropTypes from "prop-types";
import styles from "./BlogPostDetail.module.css";

const BlogPostDetail = ({ title, content, author, date }) => {
  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  let formattedDate = "Invalid date";
  try {
    formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    console.error("Invalid date format:", date);
  }

  return (
    <>
      <div className={styles.blogPostDetail}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>By {author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

BlogPostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
};

export default BlogPostDetail;
