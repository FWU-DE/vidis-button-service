import React, { useState, useEffect } from 'react';
import { Root, Button, Search, Link } from './styles.js';
import logo from './assets/logo.png';
import data from './config/data.json';

function VIDISButton() {

  // TODO: Data needs to be a fetched from Keycloack
  const d = data;
  
  const [showSearch, setShowSearch] = useState(false);
  const [idp, setIdp] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log();


  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Check if it's the first visite
    setIdp(JSON.parse(localStorage.getItem('idpData')));

    // Search Algorythm
    const results = Object.values(d.idp).filter(identityProvider =>
      identityProvider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, 
  [searchTerm]);

  // Control function to show search if needed
  function handleClick() {
    setShowSearch(true);
  }
  // Choose IDP and save it to localstorage
  function handleChoose(provider) {
    localStorage.setItem('idpData', JSON.stringify(provider));
    setIdp(JSON.parse(localStorage.getItem('idpData')));
    setShowSearch(false);
  }

  return (
    <Root>
      {idp == null
        ? <div>
            {showSearch
              ? 
              <div>
                <p>Suche dein Landesportal</p>
                <Search
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                />
             </div>
            : <Button href="#" onClick={handleClick}>
                <img src={logo} alt="Logo" />  
                <p>VIDIS Anmeldung</p>
              </Button>
            }
             {searchTerm
              ? 
                <ul>  
                  {searchResults.map(item => (
                    <li><Link onClick={() => handleChoose(item)}>{item.name}</Link></li>
                  ))}
                </ul>
                : <span></span>
                }
          </div>
        : <Button href={idp.link}>
            <img src={logo} alt="Logo" />  
            <p>VIDIS Anmeldung {idp.name}</p>
          </Button>
      }
    </Root>
  );
}

export default VIDISButton;
