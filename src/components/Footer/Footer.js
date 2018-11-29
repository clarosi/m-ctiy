import React from "react";

import { CityLogo } from "../UI/Icons/Icons";

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo 
            link 
            linkTo="/" 
            width="70px" 
            height="70px" 
        />
      </div>
      <div className="logo_disc">
        Manchester City {(new Date()).getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
