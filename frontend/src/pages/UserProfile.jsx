import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImage: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.profileImage) {
        setPreview(`http://localhost:5000/uploads/${storedUser.profileImage}`);
      }
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setMessage('❌ Unauthorized');

    setMessage('⏳ Updating...');

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Profile updated successfully');
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.profileImage) {
        setPreview(`http://localhost:5000/uploads/${res.data.profileImage}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update profile');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3 className="mb-3">👤 My Profile</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <img
            src={
              preview ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }
            alt="Profile"
            className="rounded-circle border"
            width="120"
            height="120"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
