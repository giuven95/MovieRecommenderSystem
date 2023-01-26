import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.css";
import DEFAULT_PAGES from "../../constants/DEFAULT_PAGES";

function FooterLinks() {
  return (
    <div className="FooterLinks">
      <h3>Internal links</h3>
      <ul>
        {DEFAULT_PAGES.map((page) => (
          <Link key={page.href} to={page.href}>
            {page.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default FooterLinks;
