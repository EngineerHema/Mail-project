import React from "react";
import './style/ContactCard.css';


function ContactCard({ contact, onDelete, onEdit }) {
  return (
    <div className = "ContactCard">
      <div>
      <h3>{contact.name}</h3>
      <ul>
        {contact.emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      </div>
      <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;