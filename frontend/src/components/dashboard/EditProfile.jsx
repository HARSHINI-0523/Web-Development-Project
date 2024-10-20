import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import API from '../../api/axios';

function EditProfile() {
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        gender: '',
        bio: '',
        city: '',
        country: '',
        photo: '',
    });
    const [photoPreview, setPhotoPreview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/user/profile');
                setUserProfile(response.data);
                setPhotoPreview(response.data.photo);
            } catch (err) {
                console.error('Fetch Profile Error:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserProfile((prevProfile) => ({
                    ...prevProfile,
                    photo: reader.result,
                }));
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const { username, gender, bio, city, country, photo } = userProfile;
            const updateData = { username, gender, bio, city, country, photo };
            const response = await API.put('/user/profile', updateData);
            setUserProfile(response.data);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to update profile. Please try again.');
            }
        }
    };

    return (
        <div className="edit-profile-container" >
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userProfile.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email ID:</label>
                    <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={userProfile.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={userProfile.bio}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={userProfile.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={userProfile.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Photo:</label>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                        <img src={photoPreview} alt="Profile Preview" className="profile-photo-preview" />
                    )}
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;
