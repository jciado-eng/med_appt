import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="notification-layout-container">
      <Navbar></Navbar>
      {children}
      
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-toast-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <div className="appointment-card__header">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <button className="appointment-card__close" onClick={handleClose}>&times;</button>
              </div>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {appointmentData?.userName || appointmentData?.user || username}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData?.date || appointmentData?.appointmentDate}
              </p>
              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData?.time || appointmentData?.appointmentTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
