// src/components/dashboard/ArtShowcase.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import API from '../../api/axios';
import {useEffect,useState} from 'react';
import { FaRegCommentAlt } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { PiHandHeartFill } from "react-icons/pi";
import { PiHandHeartLight } from "react-icons/pi";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ArtShowcase() {

    let {state}=useLocation();
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        bio: '',
        city: '',
        country: '',
        photo: '',
    });
    const [posts, setPosts] = useState([]);
    
    const [comments, setComments] = useState([]); // Store comments for the selected post
    const [newComment, setNewComment] = useState(''); // For user input
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false); // New modal state for comments
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);
    
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Get JWT token
            const response = await API.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserProfile(response.data);
            
            fetchPosts();
        } catch (err) {
            console.error('Fetch Profile Error:', err);
            setError('Failed to load profile.');
        }
    };
    const fetchPosts = async () => {
        try {
            
            const token = localStorage.getItem('token');
            const res = await API.get(`/posts/${state}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(res.data);
            
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    //Handle likes
    const handleLike = async (postId, isLiked) => {
        const token = localStorage.getItem('token');
        
        try {
            if (isLiked) {
                // Unlike the post (remove userId from likedBy)
                
                await API.patch(`/posts/${postId}/unlike`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Like the post (add userId to likedBy)
                
                await API.patch(`/posts/${postId}/like`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            // Refresh posts after like/unlike
             fetchPosts();
        } catch (err) {
            console.error('Like/Unlike Error:', err);
            setError('Failed to update like status.');
        }
    };
    //Handle reposts
    const handleRepost = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            // API call to repost the post
            await API.post(`/reposts/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
    
            // Fetch reposts again to reflect the new reposted post
        } catch (err) {
            console.error('Repost Error:', err);
            setError('Failed to repost.');
        }
    };
    //Function to open Comments modal
    const openCommentsModal = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get(`/posts/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            console.log(response);
            setComments(response.data); // Fetch and set comments
            setSelectedPost(postId); // Set selected post
            setCommentsModalIsOpen(true); // Open comments modal
        } catch (err) {
            console.error('Fetch Comments Error:', err);
            setError('Failed to load comments.');
        }
    };

    const submitComment = async () => {
        if (!newComment) return;

        try {
            const token = localStorage.getItem('token');
            const response = await API.post(`/posts/${selectedPost}/comment`, { comment: newComment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setComments([...comments, response.data]); // Add new comment to the list
            setNewComment(''); // Clear input field
        } catch (err) {
            console.error('Submit Comment Error:', err);
            setError('Failed to submit comment.');
        }
    };
    //Function to close Comments modal
    const closeCommentsModal = () => {
        setCommentsModalIsOpen(false);
        setComments([]);
        setSelectedPost(null);
    };

    // Function to open the image modal and set selected post
    const openModal = (post) => {
        setSelectedPost(post);
        setModalIsOpen(true);
    };

    // Function to close the image modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPost(null);
    };

    return (
        <div className="posts-container">
        {error && <p className="error-message">{error}</p>}
        {posts.length > 0 ? (
            posts.map((post) => {
                const isLiked = post.likedBy.includes(userProfile._id);
               

                return (
                    <div key={post._id} className="post-card">
                         <div className="post-user-info p-3 text-center">
                            <h5>Posted by: {post.user ? post.user.username : 'Unknown User'}</h5>
                        </div>
                        <img
                            src={`http://localhost:5000/uploads/${encodeURIComponent(post.imageUrl)}`}
                            alt="Post"
                            className="post-image"
                            onClick={() => openModal(post)} // Open image modal on click
                        />
                        <div className='post-details'>
                            <h6>{post.title}</h6>
                            <p>{post.description}</p>
                            
                        </div>
                        <div className='justify-content-around'>
                            {isLiked ? (
                                <button
                                    onClick={() => handleLike(post._id, true)}
                                    style={{ padding: 0, margin: 0, marginBottom: 15, border: 'none', background: 'none' }}
                                >
                                    <PiHandHeartFill className='fs-2' />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleLike(post._id, false)}
                                    style={{ padding: 0, margin: 0, marginBottom: 15, border: 'none', background: 'none' }}
                                >
                                    <PiHandHeartLight className='fs-2' />
                                </button>
                            )}
                            <button onClick={() => openCommentsModal(post._id)}
                                style={{ padding: 0, margin: 0, marginBottom: 15, border: 'none', background: 'none' }}>
                                <FaRegCommentAlt className='fs-4' />
                            </button>
                            <button
                                onClick={() => handleRepost(post._id)} // Trigger repost
                                style={{ padding: 0, margin: 0, marginBottom: 15, border: 'none', background: 'none' }}>
                                <BiRepost className='fs-2' />
                            </button>

                        </div>
                        {/*Image Modal */}
                        {selectedPost && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Post Details"
                    className="PostModal"
                    overlayClassName="PostOverlay"
                >
                    <h2>{selectedPost.title}</h2>
                    <img src={`http://localhost:5000/uploads/${encodeURIComponent(selectedPost.imageUrl)}`} alt="Post" className="modal-post-image" />
                    <p>{selectedPost.description}</p>

                    <div className="modalBtns">
                        <button onClick={closeModal}>Close</button>
                        {selectedPost && selectedPost.likedBy && selectedPost.likedBy.includes(userProfile._id) ? (
                            <button className='modalBtn'
                                onClick={() => handleLike(selectedPost._id, true)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                <PiHandHeartFill className='fs-2' />
                            </button>
                        ) : (
                            <button className='modalBtn'
                                onClick={() => handleLike(selectedPost._id, false)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                <PiHandHeartLight className='fs-2' />
                            </button>
                        )}

                        <button onClick={() => openCommentsModal(selectedPost._id)} className='modalBtn'
                            style={{ padding: 0, margin: 0 }}>
                            <FaRegCommentAlt className='fs-4' />
                        </button>
                        <button
                            onClick={() => handleRepost(selectedPost._id)} className='modalBtn'
                            style={{ padding: 0, margin: 0 }}>
                            <BiRepost className='fs-2' />
                        </button>

                    </div>
                </Modal>
            )}
               {/* Comments Modal */}
               {commentsModalIsOpen && (
                <Modal
                    isOpen={commentsModalIsOpen}
                    onRequestClose={closeCommentsModal}
                    contentLabel="Comments"
                    className="CommentsModal"
                    overlayClassName="CommentsOverlay"
                >
                    <h2>Comments</h2>
                    <div className="comments-container">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="comment-item">
                                    <p>{comment.comment}</p>
                                    <p><strong>By:</strong> {comment.madeBy ? comment.madeBy.username : 'Unknown User'}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </div>

                    {/* Add Comment Form */}
                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                        />
                        <button onClick={submitComment}>Submit</button>
                    </div>

                    <button onClick={closeCommentsModal}>Close</button>
                </Modal>
            )}
                    </div>
                );
            })
        ) : (
            <p>No posts available.</p>
            
        )}
    </div>

    );
}

export default ArtShowcase;
