import React, { useState } from 'react';
import './GiveReviews.css';

function GiveReviews() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology', reviewGiven: '', isReviewed: false },
    { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology', reviewGiven: '', isReviewed: false }
  ]);

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const handleFeedbackClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setFormData({ name: '', review: '', rating: 0 });
    setShowWarning(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    setDoctors(doctors.map(doc => {
      if (doc.id === selectedDoctorId) {
        return {
          ...doc,
          reviewGiven: `${formData.review} (Rating: ${formData.rating}/5)`,
          isReviewed: true
        };
      }
      return doc;
    }));

    setSelectedDoctorId(null);
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button 
                  className="feedback-btn"
                  onClick={() => handleFeedbackClick(doctor.id)}
                  disabled={doctor.isReviewed}
                >
                  {doctor.isReviewed ? 'Submitted' : 'Click Here'}
                </button>
              </td>
              <td className="review-given-cell">
                {doctor.reviewGiven}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDoctorId && (
        <div className="modal-overlay">
          <form onSubmit={handleSubmit} className="review-form">
            <h2>Give Your Feedback</h2>
            {showWarning && <p className="warning">Please fill out all fields and select a rating.</p>}
            
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
            </div>

            <div className="rating-selector">
              <label>Rating:</label>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    className={`rating-btn ${formData.rating === num ? 'active' : ''}`}
                    onClick={() => handleRatingChange(num)}
                  >
                    {num} ★
                  </button>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="cancel-btn" onClick={() => setSelectedDoctorId(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
