// src/components/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

function DashboardLayout() {
    return (
        <Dashboard>
            <Outlet />
        </Dashboard>
    );
}

export default DashboardLayout;
