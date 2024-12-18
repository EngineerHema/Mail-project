import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import './style/Contacts.css';

function App({ API_KEY, emailAddress }) {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", emails: [""] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [sortMethod, setSortMethod] = useState('a-z'); // State to hold the sort method
  const [searchString, setSearchString] = useState('');

  // Helper function to send data to the backend
  const sendContactToBackend = (method, contact, id = null) => {
    console.log(method);
    const url = id!==null 
    ? method !== "DELETE" 
      ? `http://localhost:8080/contacts/${id}`
      : `http://localhost:8080/contacts/${id}/${emailAddress.current}`
    : "http://localhost:8080/contacts";  // No ID provided, base URL
  
    console.log(url)
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY.current}`,
      },
      body: method !== "DELETE" ? JSON.stringify({
        emailAddress: emailAddress.current,
        ...contact,
      }) : undefined,
      
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
      sendContactToBackend("PUT", newContact, editingIndex); // PUT request for update
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
    console.log("delete" + index);
    sendContactToBackend("DELETE", contacts[index], index);
    setContacts(contacts.filter((_, i) => i !== index));
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

  function searchByName(data, searchString) {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  function applyOperation(data) {
    // Check the current sort method and apply sorting accordingly
    if (sortMethod === 'a-z') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMethod === 'z-a') {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }
    setContacts(searchByName(data, searchString));
    return data; // Return the sorted data
  }

  const fetchContacts = async () => {
    const url = `http://localhost:8080/contacts/${emailAddress.current}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${API_KEY.current}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      applyOperation(data)
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  const applyChanges = () => {
    fetchContacts();
  };

  return (
    <div className="ContactServiceContainer">
    <div className="title-container">
      <h1>Contact Management</h1>
      {/* Dropdown for sorting */}
      <select
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
        className = "select"
      >
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className = "input"
      />
      {/* Apply button */}
      <button onClick={applyChanges} className="applyButton">Apply</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        {/* Input fields for contact details and buttons */}
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