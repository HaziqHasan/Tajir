import React, { useState } from "react";
import HomeCategory from "./HomeCategory";
import About from "./About";
import Home from "./Home";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArtInfo from "./ArtInfo";

export default function Mainsection() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollToId;
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        // wait a bit for rendering
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
  return (
    <div className="bg-white relative scroll-smooth pt-16">
      <section id="home">
        <Home
          openLogin={() => setShowLogin(true)}
          openSignup={() => setShowSignup(true)}
        />
      </section>

      <section id="products" className="shadow-lg">
        <HomeCategory />
      </section>
      <section id="artinfo" className="shadow-lg">
        <ArtInfo />
      </section>

      <section id="about" className="shadow-lg">
        <About />
      </section>

      <section id="contact" className="shadow-lg">
        <Footer />
      </section>

      {showLogin && (
        <LoginPage
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setTimeout(() => setShowSignup(true), 300);
          }}
        />
      )}

      {showSignup && (
        <SignUpPage
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setTimeout(() => setShowLogin(true), 300);
          }}
        />
      )}
    </div>
  );
}
