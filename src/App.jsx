import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';  
import Notification from './Components/Notification/Notification';
import GiveReviews from './Components/GiveReviews/GiveReviews';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import ProfileCard from './Components/ProfileCard/ProfileCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/reviews" element={<GiveReviews />} />
            <Route path="/reports" element={<ReportsLayout />} />
            <Route 
              path="/profile-card" 
              element={
                <ProfileCard 
                  userName={sessionStorage.getItem("name") || "Peter"} 
                  onLogout={handleLogoutPlaceholder} 
                />
              } 
            />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
