import React, { useState } from "react";
import ContactCard from "./ContactCard";
import './style/Contacts.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", emails: [""] });
  const [editingIndex, setEditingIndex] = useState(null);

  // Helper function to send data to the backend
  const sendContactToBackend = (method, contact, id = null) => {
    const url = id ? `http://localhost:8080/contacts/${id}` : "http://localhost:8080/contacts";
    
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact), // Send contact as JSON
    })
    .then(response => response.json())
    .then(data => {
      console.log("Contact operation successful:", contact);
      console.log(id);
      // Handle response if needed, e.g., update local contacts list
    })
    .catch(error => {
      console.error("Error with contact operation:", error);
    });

    console.log("Id: "+id);
  };

  // Handle adding or editing a contact
  const handleAddContact = () => {
    if (!newContact.name.trim()) {
      alert("Name field cannot be empty!");
      return;
    }

    if (newContact.emails.some(email => !email.trim())) {
      alert("Please fill in all email fields!");
      return;
    }

    if (editingIndex !== null) {
      // Edit existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = newContact;
      setContacts(updatedContacts);
      sendContactToBackend("PUT", newContact, contacts[editingIndex].id); // PUT request for update
    } else {
      // Add new contact
      setContacts([...contacts, newContact]);
      sendContactToBackend("POST", newContact); // POST request for adding a contact
    }

    // Reset the form after the operation
    setNewContact({ name: "", emails: [""] });
    setEditingIndex(null);
  };

  // Handle deleting a contact
  const handleDeleteContact = (index) => {
    const contactId = contacts[index].id;
    setContacts(contacts.filter((_, i) => i !== index));
    sendContactToBackend("DELETE", contacts[index], contactId);
  };

  // Handle editing a contact
  const handleEditContact = (index) => {
    setNewContact(contacts[index]);
    setEditingIndex(index);
  };

  // Handle adding an email input field
  const handleAddEmailField = () => {
    setNewContact({ ...newContact, emails: [...newContact.emails, ""] });
  };

  // Handle updating email input value
  const handleEmailChange = (index, value) => {
    const updatedEmails = [...newContact.emails];
    updatedEmails[index] = value;
    setNewContact({ ...newContact, emails: updatedEmails });
  };

  // Handle removing an email input field
  const handleRemoveEmailField = (index) => {
    const updatedEmails = newContact.emails.filter((_, i) => i !== index);
    setNewContact({ ...newContact, emails: updatedEmails });
  };

  return (
    <div className="ContactServiceContainer">
      <h1>Contact Management</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        {newContact.emails.map((email, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="Email"
            />
            {newContact.emails.length > 1 && (
              <button onClick={() => handleRemoveEmailField(index)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={handleAddEmailField}>Add Email</button>
        <button onClick={handleAddContact}>Save Contact</button>
      </div>

      {contacts.map((contact, index) => (
        <ContactCard
          key={index}
          contact={contact}
          onDelete={() => handleDeleteContact(index)}
          onEdit={() => handleEditContact(index)}
        />
      ))}
    </div>
  );
}

export default App;
