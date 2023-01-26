import React from "react";
import "./Footer.css";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FooterLinks from "./FooterLinks";

function Footer() {
  return (
    <footer id="Footer" className="Footer">
      <div className="FooterTop">
        <img alt="Giuseppe Venuto" src="GiuseppeVenuto.jpeg" />
        <span>Originally developed by Giuseppe Venuto.</span>
        <a href="mailto:giuven95@gmail.com">
          <EmailIcon />
        </a>
        <a href="https://facebook.com/giuseppe.venuto.52">
          <FacebookIcon />
        </a>
        <a href="https://www.reddit.com/user/giuven">
          <RedditIcon />
        </a>
        <a href="https://www.linkedin.com/in/giuven95">
          <LinkedInIcon />
        </a>
        <span className="FooterThanks">
          Thanks to <a href="https://github.com/ankitects/anki">Anki</a>,{" "}
          <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page">
            Wikidata
          </a>
          , <a href="https://www.wikipedia.org">Wikipedia</a>,{" "}
          <a href="https://ankiweb.net/about">AnkiWeb</a>,{" "}
          <a href="https://flask.palletsprojects.com/en/2.2.x/">Flask</a>,{" "}
          <a href="https://reactjs.org">React.js</a>{" "}
        </span>
      </div>
      <div className="FooterBottom">
        <FooterLinks />
      </div>
    </footer>
  );
}

export default Footer;
