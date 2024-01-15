import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const accessToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/')
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 header">
          <h1 className="h1">Strong Password Generator</h1>
          <div className="col-md-12">
            <h4>Create strong passwords with Password Generator</h4>
          </div>
          {accessToken && (
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
