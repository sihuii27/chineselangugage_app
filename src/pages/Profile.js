import '../styles/resources.css';
import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from "antd";
import { useLocation } from 'react-router-dom';

const Profile = ({ setIsLoggedIn }) => {
    const location = useLocation();
    const [username, setUsername] = useState('');
    
    useEffect(() => {
      if (location.state?.username) {
        setUsername(location.state.username);
        setIsLoggedIn(true);
      }
    }, [location, setIsLoggedIn]);
    return (
      <div>
        <h1>Learning Progress</h1>
        <br/>
        <h2>Your learning progress will be displayed here.</h2>

        <Row>
          <Col span={12}>
            <h3>Username: {username}</h3>
          </Col>

        </Row>
      </div>

    );
  };
  
export default Profile;
  