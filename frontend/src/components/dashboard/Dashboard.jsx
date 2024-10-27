import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
    FaUser, FaPalette, FaPlus, FaNetworkWired, FaBook, 
    FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp, FaSearch 
} from 'react-icons/fa';
import './Dashboard.css';
import Create from './Create';  // Import Create component

function Dashboard() {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);  // Track modal state

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const openCreateModal = () => {
        setIsCreateOpen(true);  // Open the modal
    };

    const closeCreateModal = () => {
        setIsCreateOpen(false);  // Close the modal
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-brand-container">
                    <Link to="/" className="sidebar-brand">ARTFUSION</Link>
                </div>
                <div className="sidebar-menu">
                    <Link to="/dashboard/art-showcase" className="sidebar-link">
                        <FaPalette /> Art Showcase
                    </Link>
                    <Link to="/dashboard/search" className="sidebar-link">
                        <FaSearch /> Search
                    </Link>
                    <button className="sidebar-link" onClick={openCreateModal}>
                        <FaPlus /> Create
                    </button>
                    <Link to="/dashboard/events" className="sidebar-link">
                        <FaNetworkWired /> Event
                    </Link>
                    {/* <Link to="/dashboard/resources" className="sidebar-link">
                        <FaBook /> Resources
                    </Link> */}
                    <Link to="/dashboard/profile" className="sidebar-link">
                        <FaUser /> Profile
                    </Link>
                    
                
                    </div>
                    <div className="sidebar-more">
                    <div className="settings-section">
                        <button
                            className="sidebar-link "
                            onClick={toggleSettings}
                            aria-expanded={isSettingsOpen}
                            aria-controls="settings-submenu"
                        >
                            <FaCog /> Settings {isSettingsOpen ? <FaChevronUp style={{paddingLeft:7}}/> : <FaChevronDown style={{paddingLeft:7}}/>}
                        </button>
                        {isSettingsOpen && (
                            <div className="settings-submenu" id="settings-submenu">
                                <Link to="/dashboard/edit-profile" className="submenu-link">
                                    Edit Profile
                                </Link>
                                <button className="submenu-link logout-button" onClick={handleLogout}>
                                    Logout <FaSignOutAlt />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <main className="dashboard-content">
                <Outlet />
            </main>

            {/* Render the Create modal conditionally */}
            {isCreateOpen && <Create onClose={closeCreateModal} username="YourUsername" />}
        </div>
    );
}

export default Dashboard;