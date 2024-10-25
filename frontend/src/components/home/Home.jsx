import React, { useEffect, useRef } from "react";
import AboutUs from "../aboutus/AboutUs";
import Services from "../services/Services";
import Footer from "../footer/Footer";
import "./Home.css";
import Header from "../header/Header";
import Typed from "typed.js";

function Home() {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const footerRef = useRef(null);
  const typedElementRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === "about-us" && aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "services" && servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Initialize Typed.js on the span element
    const options = {
      strings: ["ART FUSION"],
      typeSpeed: 30,
      startDelay: 1200,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: Infinity,
      showCursor: false,
      contentType: "html",
    };

    // Create a new Typed instance
    const typed = new Typed(typedElementRef.current, options);

    // Cleanup function to destroy Typed.js instance on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="m-2">
      {/* Main Photo Section */}
      <Header />
      <div className="">
        <div className="main-photo-section">
          <div className="transparent-box">
            <span ref={typedElementRef} className="fs-2 "></span>

            <p className="fs-4">A Creative Haven for Artists and Art Enthusiasts</p>
            
          </div>
        </div>
        <h1>
          <center>About-Us</center>
        </h1>
        {/* About Us Section */}
        <div className="my-4" ref={aboutUsRef} id="about-us">
          <AboutUs />
        </div>
        <h1>
          <center>Our Services</center>
        </h1>
        {/* Services Section */}
        <div className="my-4" ref={servicesRef} id="services">
          <Services />
          {/* Footer Section */}
        </div>
        <div className="my-4" ref={footerRef} id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
