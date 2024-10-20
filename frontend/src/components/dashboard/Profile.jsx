import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import './Profile.css'; // Import styling

function Profile() {
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        bio: '',
        city: '',
        country: '',
        photo: '',
    });
    const [posts, setPosts] = useState([]);
    const [reposts, setReposts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get JWT token
                const response = await API.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setUserProfile(response.data);
                fetchPosts();
                fetchReposts();
            } catch (err) {
                console.error('Fetch Profile Error:', err);
                setError('Failed to load profile.');
            }
        };

        fetchProfile();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/posts/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response", response)
            setPosts(response.data);
            console.log("Response data", posts);
        } catch (err) {
            console.error('Fetch Posts Error:', err);
            setError('Failed to load posts.');
        }
    };

    const fetchReposts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/reposts/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReposts(response.data);
        } catch (err) {
            console.error('Fetch Reposts Error:', err);
            setError('Failed to load reposts.');
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="profile-container" >
            <div className="profile-header">
                <div className="profile-photo-container">
                    {userProfile.photo && (
                        <img src={userProfile.photo} alt="Profile" className="profile-photo" />
                    )}
                </div>
                <div className="profile-info-container">
                    <h2>{userProfile.username}</h2>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Bio:</strong> {userProfile.bio}</p>
                    <p><strong>City:</strong> {userProfile.city}</p>
                    <p><strong>Country:</strong> {userProfile.country}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button
                    className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
                    onClick={() => handleTabClick('posts')}
                >
                    Posts
                </button>
                <button
                    className={`tab-button ${activeTab === 'reposts' ? 'active' : ''}`}
                    onClick={() => handleTabClick('reposts')}
                >
                    Reposts
                </button>
            </div>

            {activeTab === 'posts' && (
                <div className="posts-container">
                    {error && <p className="error-message">{error}</p>}
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="post-card">
                                
                                <img src={`http://localhost:5000/uploads/${encodeURIComponent(post.imageUrl)}`} alt="Post" className="post-image" />

                                <div className='post-details'>
                                    <p>{post.caption}</p>
                                    {/* <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            )}

            {activeTab === 'reposts' && (
                <div className="reposts-container">
                    {error && <p className="error-message">{error}</p>}
                    {reposts.length > 0 ? (
                        reposts.map((repost) => (
                            <div key={repost._id} className="post-card">
                                <img src={`/${repost.image}`} alt="Repost" className="post-image" />
                                <p>{repost.caption}</p>
                                <p>Reposted on: {new Date(repost.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reposts available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;