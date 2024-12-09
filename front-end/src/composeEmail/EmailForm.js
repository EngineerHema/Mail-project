import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { EmailBuilder } from './NewEmail'; // Import the EmailBuilder class
import "../style/EmailForm.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    fromAddress: '',
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

  // Function to send email to backend
  const sendEmailToBackend = async (emailData) => {
    try {
      console.log(emailData);
      const response = await axios.post('http://localhost:8080/sendEmail', emailData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error during email sending:", error);
      alert('Something went wrong. Please try again later.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the email using the EmailBuilder
    const emailBuilder = new EmailBuilder();

    // Add all email properties
    const email = emailBuilder
      .setFromAddress('your-email@example.com')  // You can customize the sender's address as needed
      .setToAddress(formData.receiverEmail)
      .setSubject(formData.subject)
      .setBody(formData.body);

    // Add attachments to the email
    formData.attachments.forEach((attachment) => {
      emailBuilder.addAttachment(attachment);
    });

    // Send the email as JSON to the backend
    const emailObject = emailBuilder.build();
    sendEmailToBackend(emailObject);

    // Reset the form after submission (including the attachments array)
    setFormData({
      subject: '',
      receiverEmail: '',
      body: '',
      attachments: [],  // Reset the attachments array
    });
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
