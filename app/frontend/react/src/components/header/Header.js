import React from "react";
import "./Header.css";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import RedditIcon from "@mui/icons-material/Reddit";

export default function Header() {
  return (
    <header className="Header">
      <div className="HeaderFront">
        <HeaderLogo />
        <h1>MovieRecommenderSystem</h1>
        <div className="HeaderLinkIcons">
          <a href="https://www.reddit.com/r/MovieRecSystem" target="_blank" rel="noopener noreferrer">
            <RedditIcon />
          </a>
        </div>
      </div>
      <HeaderMenu />
    </header>
  );
}
