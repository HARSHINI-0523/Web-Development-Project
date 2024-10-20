// src/components/dashboard/ArtShowcase.jsx
import React from 'react';

function ArtShowcase() {
    return (
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
    );
}

export default ArtShowcase;
