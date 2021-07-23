import React, { useState, useEffect } from 'react';
import { Root, Button, Label, FormContainer } from './styles.js';
import logo from './assets/logo.png';
import data from './config/data.json';
import { Form } from 'react-bootstrap'

function VIDISButton() {

  // TODO: Data needs to be a fetched from Keycloack
  const d = data;
  
  const [showSearch, setShowSearch] = useState(false);
  const [idpChoosed, setIdpChoosed] = useState(false);
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
    setIdpChoosed(true)
    localStorage.setItem('idpData', JSON.stringify(provider));
    setIdp(JSON.parse(localStorage.getItem('idpData')));
  }

  return (
    <Root>
      {idp == null
        ? <div>
            {showSearch
              ? 
              <FormContainer>
                <Form>
                <Form.Group>
                  <Label>Suche dein Portal</Label>
                  <Form.Control type="search" autoFocus={true} value={searchTerm} onChange={handleChange} placeholder="z.B SuBITI Bremen" />
                </Form.Group>
              </Form>
             </FormContainer>
             :<Button href="#" onClick={handleClick}>
                <img src={logo} alt="Logo" />  
                <p>VIDIS Anmeldung</p>
               </Button> 
            }
             {searchTerm
              ? 
                <ul>  
                  {searchResults.map(item => (
                    <li>
                      <Button href={item.link} onClick={() => handleChoose(item)}>
                        <img src={logo} alt="Logo" />  
                        <p>VIDIS Anmeldung {item.name}</p>
                      </Button>
                    </li>
                  ))}
                </ul>
                : <span></span>
                }
          </div>
        : 
        <div>

          {idpChoosed == false
            ? 
      
          <Button href={idp.link}>
            <img src={logo} alt="Logo" />  
            <p>VIDIS Anmeldung {idp.name}</p>
          </Button>

          : <span></span> }
          </div>
      }
    </Root>
  );
}

export default VIDISButton;
