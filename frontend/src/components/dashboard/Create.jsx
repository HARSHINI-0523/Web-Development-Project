import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import API from '../../api/axios';
import './Create.css'; 

function Create() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [caption, setCaption] = useState('');
    const navigate = useNavigate(); 

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file (JPG, PNG, JPEG, etc.)');
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }
    
        if (!caption) {
            alert('Please enter a caption.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('caption', caption);
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in.');
                return;
            }
    
            const response = await API.post('/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log('Post created:', response.data);
            alert('Post created successfully!');
            navigate('/dashboard/profile');
        } catch (error) {
            console.error('Post creation error:', error);
            alert('Failed to create post.');
        }
    };

    return (
        <div className="create-container">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Create a Post</h3>
                <hr className="mb-4" />

                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <p className="mb-4">Select an image from your computer</p>

                        <button
                            type="button"
                            className="file-select-button"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            {selectedFile ? 'Change Image' : 'Select Image'}
                        </button>

                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {previewUrl && (
                            <div className="mt-4">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-lg mx-auto"
                                />
                            </div>
                        )}

                        <textarea
                            className="mt-4 w-full p-2 border rounded"
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

                        {selectedFile && (
                            <button
                                type="submit"
                                className="submit-button mt-6"
                            >
                                Create Post
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;