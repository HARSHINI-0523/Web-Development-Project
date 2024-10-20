import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {
    FaUser,
    FaPalette,
    FaPlus,
    FaNetworkWired,
    FaBook,
    FaCog,
    FaSignOutAlt,
    FaChevronDown,
    FaChevronUp,
    FaSearch,
} from 'react-icons/fa';

function Dashboard() {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                {/* ARTFUSION Brand Link */}
                <div className="sidebar-brand-container">
                    <Link to="/" className="sidebar-brand">
                        ARTFUSION
                    </Link>
                </div>

                {/* Sidebar Menu */}
                <div className="sidebar-menu">
                    <Link to="/dashboard/art-showcase" className="sidebar-link">
                        <FaPalette /> Art Showcase
                    </Link>
                    <Link to="/dashboard/create" className="sidebar-link">
                        <FaPlus /> Create
                    </Link>
                    <Link to="/dashboard/events" className="sidebar-link">
                        <FaNetworkWired /> Events
                    </Link>
                    <Link to="/dashboard/resources" className="sidebar-link">
                        <FaBook /> Resources
                    </Link>
                    <Link to="/dashboard/profile" className="sidebar-link">
                        <FaUser /> Profile
                    </Link>
                    <Link to="/dashboard/search" className="sidebar-link">
                        <FaSearch /> Search
                    </Link>
                </div>

                {/* Sidebar More Options */}
                <div className="sidebar-more">
                    <div className="more-options">
                        <div className="settings-section">
                            <button className="sidebar-link settings-button" onClick={toggleSettings} aria-expanded={isSettingsOpen} aria-controls="settings-submenu">
                                <FaCog /> Settings {isSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {isSettingsOpen && (
                                <div className="settings-submenu" id="settings-submenu">
                                    <Link to="/dashboard/edit-profile" className="submenu-link">
                                        Edit Profile
                                    </Link>
                                    <Link to="/dashboard/activity" className="submenu-link">
                                        Activity
                                    </Link>
                                    <button className="submenu-link logout-button" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;
