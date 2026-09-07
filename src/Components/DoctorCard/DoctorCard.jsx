import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> 
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

     
      <div className="doctor-card-options-container">
        {appointments.length > 0 ? (
        
          <div className="appointment-details-booked">
            <h3 style={{ color: 'green' }}>Appointment Booked!</h3>
            <p><strong>Patient:</strong> {appointments[0].name}</p>
            <p><strong>Date:</strong> {appointments[0].appointmentDate}</p>
            <p><strong>Time Slot:</strong> {appointments[0].timeSlot}</p>
            <button 
              className="cancel-appointment-btn" 
              onClick={() => handleCancel(appointments[0].id)}
            >
              Cancel Appointment
            </button>
          </div>
        ) : (
         
          <div>
            <button className='book-appointment-btn' onClick={handleBooking}>                    
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>

            <Popup
              open={showModal}
              onClose={() => setShowModal(false)}
              modal
              nested
            >
              <div className="modal">
                <button className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
                <div className="header"> Book Appointment with {name} </div>
                <div className="content">
                  <AppointmentFormIC 
                    doctorName={name} 
                    doctorSpeciality={speciality} 
                    onSubmit={handleFormSubmit} 
                  />
                </div>
              </div>
            </Popup>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCardIC;
