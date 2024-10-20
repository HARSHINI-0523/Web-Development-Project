import React from "react";
import "./Header.css";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="d-flex flex-wrap justify-content-between p-4 header ">
            {/* ARTFUSION Brand Link */}
            <h1 className="fs-2 text-white p-3 pr-5 head">
                <Link to="/" className="header-brand">
                    ARTFUSION
                </Link>
            </h1>
            <ul className="list list-inline-item pt-4 text-dangerous">
                <li className="list-inline-item mx-3 px-5">
                    <a href="#home" className="nav-link text-white">
                        <FaHome className="fs-2 px-2 text-primary" />Home
                    </a>
                </li>
                <li className="list-inline-item mx-3 px-5">
                    <a href="#about-us" className="nav-link text-white">
                        <FcAbout className="fs-2 px-2 text-primary" />About Us
                    </a>
                </li>
                <li className="list-inline-item mx-3 px-5">
                    <a href="#services" className="nav-link text-white">
                        <MdOutlineMiscellaneousServices className="fs-2 px-2 text-primary" />Services
                    </a>
                </li>
                <li className="list-inline-item mx-3 px-5">
                    <Link to="/signup" className="nav-link text-white">
                        <IoLogInOutline className="fs-2 px-2 text-primary" />Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;