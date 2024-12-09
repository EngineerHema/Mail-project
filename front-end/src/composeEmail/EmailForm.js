import React, { useState } from 'react';
import "../style/EmailForm.css"

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    receiverEmail: '',
    body: '',
    attachments: [], // Array to hold multiple file names
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const fileNames = files.map(file => file.name); // Extract file names
    setFormData((prevData) => ({
      ...prevData,
      attachments: [...prevData.attachments, ...fileNames], // Add new file names to the array
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission
    console.log(formData);
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <h2>Send Email</h2>
      <div className="form-group">
        <label htmlFor="receiverEmail">Receiver's Email</label>
        <input
          type="email"
          id="receiverEmail"
          name="receiverEmail"
          value={formData.receiverEmail}
          onChange={handleChange}
          placeholder="Enter receiver's email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter subject"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Email Body</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter email body"
          rows="6"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="attachments">Attachments</label>
        <input
          type="file"
          id="attachments"
          name="attachments"
          onChange={handleFileChange}
          accept="*/*"
          multiple // Allow multiple file selections
        />
        {formData.attachments.length > 0 && (
          <ul className="attachment-list">
            {formData.attachments.map((attachment, index) => (
              <li key={index}>{attachment}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="submit-btn">Send Email</button>
    </form>
  );
};

export default EmailForm;
