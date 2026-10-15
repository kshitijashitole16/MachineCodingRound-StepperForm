import React from "react";

const Submited = ({ formData = {} }) => {
  return (
    <div className="submitted-container">
      <div className="success-icon">✓</div>

      <h2 className="submitted-title">
        Application Submitted!
      </h2>

      <p className="submitted-message">
        Thank you for providing your details.
        Your information has been submitted successfully.
      </p>

      <div className="submitted-info">
        <p>
          <strong>Status:</strong> Submitted
        </p>

        <p>
          <strong>Name:</strong> {formData.name || "Not provided"}
        </p>

        <p>
          <strong>Email:</strong> {formData.email || "Not provided"}
        </p>

        <p>
          <strong>City:</strong> {formData.city || "Not provided"}
        </p>

        <p>
          <strong>Next Step:</strong> We will review your information.
        </p>
      </div>

      <p className="submitted-footer">
        You can safely close this form now.
      </p>
    </div>
  );
};

export default Submited;