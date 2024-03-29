import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  // chuyển array to string được ngăn cách bằng dấu ' '
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    // To get refresh-token
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};

const googleOAuthURL = getGoogleAuthUrl();

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <video controls width={500}>
        <source
          src="https://twitter-clone-ap-southeast-1-singapore.s3.ap-southeast-1.amazonaws.com/videos/682761d1a1db2461f502e2800.mp4"
          type="video/mp4"
        />
      </video>
      <h1>Google OAuth 2.0</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in </p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={googleOAuthURL}>Login with google</Link>
      )}
    </>
  );
};

export default Home;
