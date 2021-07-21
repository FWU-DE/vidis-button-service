import React from 'react'; // import Keycloak from 'keycloak-js';

import { Root, Button } from './styles.js';
import logo from './assets/logo.png';
import data from './config/data.json';

function VIDISButton() {
  const d = data;
  console.log(d);
  return /*#__PURE__*/React.createElement(Root, null, /*#__PURE__*/React.createElement(Button, {
    href: d.idp[0].link
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Logo"
  }), /*#__PURE__*/React.createElement("p", null, "VIDIS Login")));
}

export default VIDISButton;