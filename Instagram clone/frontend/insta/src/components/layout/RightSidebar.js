import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/rightSidebar.css';

const currentUser = {
  username: 'mahakaal_bhakt449',
  fullName: 'Mahakaal Bhakt Kshatriya Brahman',
  avatar: '/avatars/mahakaal.jpg'
};

const suggestions = [
  { username: 'alkesh121096', avatar: '/rightimg/1.jpg', followedBy: 'tripathianurag527' },
  { username: 'nidhi_rai22', avatar: '/rightimg/2.jpg', followedBy: 'krishna_om83' },
  { username: 'rahul_sengar99', avatar: '/rightimg/3.jpg', followedBy: 'shivam_singh92' },
  { username: 'deepika_sisodia', avatar: '/rightimg/4.jpg', followedBy: 'priyanshu_om13' },
  { username: 'yash_trivedi_', avatar: '/rightimg/5.jpg', followedBy: 'manish_rajput88' },
  { username: 'megha_dubey7', avatar: '/rightimg/6.jpg', followedBy: 'alok_yadav902' },
  { username: 'karan_prajapati', avatar: '/rightimg/7.jpg', followedBy: 'prince_chouhan94' }
];

const RightSidebar = () => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(currentUser.avatar);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setUploadedImage(imageDataUrl);
        localStorage.setItem('profileImage', imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="right-sidebar">
      {/* Profile Info */}
      <div className="user-info">
        <div className="user-info-left">
          <div className="avatar-container" onClick={() => fileInputRef.current.click()}>
            <img src={uploadedImage} alt="Profile" className="avatar large" />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
          <div className="user-text">
            <span className="username">{currentUser.username}</span>
            <span className="fullname">{currentUser.fullName}</span>
          </div>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      {/* Suggestions */}
      <div className="suggestions-header">
        <span>Suggested for you</span>
        <button className="see-all">See All</button>
      </div>

      <div className="suggestions">
        {suggestions.map((user) => (
          <div className="suggestion" key={user.username}>
            <img src={user.avatar} alt={user.username} className="avatar small" />
            <div className="suggestion-details">
              <span className="username">{user.username}</span>
              <span className="followed-by">Followed by {user.followedBy}</span>
            </div>
            <span className="follow-text">Follow</span>
          </div>
        ))}
      </div>

      <div className="footer-links">
        <span>About · Help · Press · API · Jobs · Privacy · Terms</span>
        <span>© 2025 Instagram from Meta</span>
      </div>
    </div>
  );
};

export default RightSidebar;
