import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { EmailBuilder } from './NewEmail'; // Import the EmailBuilder class
import "../style/EmailForm.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    fromAddress: '',
    subject: '',
    receiverEmail: '',
    toAddress: [],
    body: '',
    attachments: [], // Array to hold file objects with content and metadata
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRecipient = () => {
    if (formData.receiverEmail.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        toAddress: [...prevData.toAddress, formData.receiverEmail.trim()],
        receiverEmail: '', // Clear the input box
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result; // Base64 encoded content

        // Create a file object with metadata and encoded content
        const fileObject = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: fileContent, // Base64 encoded content
        };

        // Append this file object to the attachments list
        setFormData((prevData) => ({
          ...prevData,
          attachments: [...prevData.attachments, fileObject],
        }));
      };
      reader.readAsDataURL(file); // Read file as a data URL (Base64)
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailBuilder = new EmailBuilder();
    const email = emailBuilder
      .setFromAddress('your-email@example.com') // Sender's email
      .setSubject(formData.subject)
      .setBody(formData.body);

    // Add all recipients
    formData.toAddress.forEach((address) => emailBuilder.addToAddress(address));

    // Add encoded attachments
    formData.attachments.forEach((attachment) =>
      emailBuilder.addAttachment(attachment)
    );

    const emailObject = emailBuilder.build();
    sendEmailToBackend(emailObject);

    // Reset the form
    setFormData({
      fromAddress: '',
      subject: '',
      receiverEmail: '',
      toAddress: [],
      body: '',
      attachments: [],
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
          placeholder="Enter recipient's email"
        />
        <button type="button" onClick={handleAddRecipient} className="add-recipient-btn">
          Add Recipient
        </button>
        {formData.toAddress.length > 0 && (
          <ul className="recipient-list">
            {formData.toAddress.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        )}
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
          multiple
        />
        {formData.attachments.length > 0 && (
          <ul className="attachment-list">
            {formData.attachments.map((attachment, index) => (
              <li key={index}>{attachment.name}</li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="submit-btn">
        Send Email
      </button>
    </form>
  );
};

export default EmailForm;
