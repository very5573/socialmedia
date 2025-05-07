// src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPosts, setReels } from '../redux/slices/feedSlice';
import '../styles/pages/profile.css';

const LOCAL_STORAGE_PROFILE_IMG = 'profileImage';
const LOCAL_STORAGE_NAME = 'fullName';

const defaultUser = {
  username: 'mahakaal_bhakt449',
  fullName: 'Mahakaal Bhakt Kshatriya Brahman',
  avatar: '/avatars/default.jpg',
  followers: 230,
  following: 180,
};

export default function Profile() {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem(LOCAL_STORAGE_PROFILE_IMG) || defaultUser.avatar
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem(LOCAL_STORAGE_NAME) || defaultUser.fullName
  );
  const [activeTab, setActiveTab] = useState('reels');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedFullName, setEditedFullName] = useState(fullName);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get('http://localhost:5000/media');
      setMedia(res.data);

      // Redux sync
      const images = res.data.filter(item => item.type === 'image');
      const videos = res.data.filter(item => item.type === 'video');

      const formattedImages = images.map(item => ({
        id: item.filename,
        image: `http://localhost:5000${item.path}`,
        profilePic: profileImg,
      }));

      const formattedReels = videos.map(item => ({
        id: item.filename,
        video: `http://localhost:5000${item.path}`,
        profilePic: profileImg,
      }));

      dispatch(setPosts(formattedImages));
      dispatch(setReels(formattedReels));
    } catch (err) {
      console.error('Error fetching media:', err);
    }
  };

  const handleDelete = async (type, filename) => {
    try {
      const res = await axios.delete(`http://localhost:5000/media/${type}/${filename}`);
      alert(res.data.message);
      fetchMedia(); // Refresh media after deletion
    } catch (err) {
      console.error('Error deleting media:', err);
      alert('Failed to delete media.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_IMG, imageUrl);
    }
  };

  const handleProfileEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    setFullName(editedFullName);
    localStorage.setItem(LOCAL_STORAGE_NAME, editedFullName);
    setIsEditModalOpen(false);
  };

  const renderMedia = (type) => {
    const items = media.filter(item => item.type === type);

    return (
      <div className={type === 'image' ? 'post-grid' : 'reel-grid'}>
        {items.map(item => (
          <div
            key={item.filename}
            className={type === 'image' ? 'post-item' : 'reel-item'}
          >
            {type === 'image' ? (
              <img
                src={`http://localhost:5000${item.path}`}
                alt="post"
                className="post-img"
              />
            ) : (
              <video
                src={`http://localhost:5000${item.path}`}
                controls
                className="reel-video"
              />
            )}
            <div
              className="three-dots"
              title="Delete"
              onClick={() => handleDelete(item.type, item.filename)}
            >
              <BsThreeDotsVertical />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={profileImg} alt="profile" className="profile-avatar" />
            <FiCamera
              className="camera-icon"
              onClick={() => document.getElementById('fileInput').click()}
            />
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="profile-info">
          <h2>{defaultUser.username}</h2>
          <button className="edit-btn" onClick={handleProfileEdit}>
            Edit Profile
          </button>
          <div className="stats">
            <span><strong>{defaultUser.followers}</strong> followers</span>
            <span><strong>{defaultUser.following}</strong> following</span>
          </div>
          <div className="fullname">{fullName}</div>
        </div>
      </div>

      <div className="profile-tabs">
        {['posts', 'reels', 'tagged'].map(tab => (
          <div
            key={tab}
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="content">
        {activeTab === 'posts' && renderMedia('image')}
        {activeTab === 'reels' && renderMedia('video')}
        {activeTab === 'tagged' && <div className="tagged-section">No tagged posts yet.</div>}
      </div>

      {isEditModalOpen && (
        <div className="edit-modal">
          <input
            type="text"
            value={editedFullName}
            onChange={(e) => setEditedFullName(e.target.value)}
          />
          <button onClick={handleEditSave}>Save</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
