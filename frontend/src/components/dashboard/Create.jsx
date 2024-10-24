// Create.jsx
import React, { useState } from 'react';
import './Create.css';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const Create = ({ onClose, username }) => {
    let navigate=useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [showCategoryOptions, setShowCategoryOptions] = useState(false);

    const gifUrl = 'data:image/jpeg;base64,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';

    const categories = ['Poetry', 'Story', 'Drawing', 'Painting', 'Crafts','Dance','Music','Pottery'];


    const handleCategorySelect = (cat) => {
        setCategory(cat);
        setShowCategoryOptions(false);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        if (!title) {
            alert('Please enter a title.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', category);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                alert('You are not logged in.');
                return;
            }

            const response = await API.post('/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Post created successfully!');
            onClose();
        } catch (error) {
            console.error('Post creation error:', error);
            alert('Failed to create post.');
        }
    };


    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="create-container">
                {!category ? (
                    <>
                        <h2>Create a Post</h2>
                        <img src={gifUrl} alt="Welcome GIF style={{ width: '50%', height: 'auto', marginBottom: '20px',marginLeft:'100px' }" className="welcome-gif" />
                        <p>Welcome back, {username}. What do you want to post today?</p>

                        <button
                            onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                            className="select-button"
                        >
                            Select Category
                        </button>
                        {showCategoryOptions && (
                            <div className="category-options">
                                {categories.map((cat) => (
                                    <div
                                        key={cat}
                                        className="category-option"
                                        onClick={() => handleCategorySelect(cat)}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Selected: {category}</h2>

                        {/* File Upload Section */}
                        <div className="file-upload">
                            <label className="file-upload-button">
                                Choose Image
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>

                        {file && (
                            <>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Selected"
                                    className="selected-image"
                                />

                                {/* Title and Description appear only after file selection */}
                                <form onSubmit={handleSubmit} className="create-form">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter post title"
                                        required
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Write a description"
                                        rows="4"
                                        required
                                    ></textarea>
                                    <div className="button-group">
                                        <button type="submit" className="submit-button">
                                            Post
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Create;