// import React from "react";
// import HomeCategory from "./HomeCategory";
// import About from "./About";
// import Home from "./Home";

// export default function Mainsection() {
//   return (
//     <div className="bg-white ">
//       <Home />
//       <div className=" shadow-lg">
//         <HomeCategory />
//       </div>
//       <div className=" shadow-lg">
//         <About />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import HomeCategory from "./HomeCategory";
import About from "./About";
import Home from "./Home";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";

export default function Mainsection() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="bg-white relative">
      <Home
        openLogin={() => setShowLogin(true)}
        openSignup={() => setShowSignup(true)}
      />

      <div className="shadow-lg">
        <HomeCategory />
      </div>
      <div className="shadow-lg">
        <About />
      </div>

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
