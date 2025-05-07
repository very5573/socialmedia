// src/components/feed/Feed.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/pages/feed.css';

const Feed = () => {
  const posts = useSelector((state) => state.feed.posts);
  const placeholderPosts = Array.from({ length: 30 });

  return (
    <div className="feed-wrapper">
      {/* Actual uploaded posts from Redux */}
      {posts.map((post, index) => (
        <div key={`real-${post.id || index}`} className="post-card">
          <div className="post-header">
            <div className="profile-pic">
              <img src={post.profilePic} alt="User" className="profile-pic-img" />
            </div>
          </div>
          <div className="post-image-placeholder">
            <img src={post.image} alt="Post" className="post-image" />
          </div>
        </div>
      ))}

      {/* Placeholder posts (unchanged) */}
      {placeholderPosts.map((_, index) => (
        <div key={`placeholder-${index}`} className="post-card">
          <div className="post-header">
            <div className="profile-pic"></div>
          </div>
          <div className="post-image-placeholder">
            Image Placeholder {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
