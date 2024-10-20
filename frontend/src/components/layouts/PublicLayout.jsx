// src/components/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

function PublicLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default PublicLayout;
