import React from 'react';

function Footer(props) {
  return (
    <footer className={localStorage.getItem('Language') != 'Arabic' ? "main-footer": "main-footer_arbic"}>
      All rights reserved.
      </footer>
  );
}

export default Footer;