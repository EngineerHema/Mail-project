import React, { useState, useEffect } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';

const ScrollableContainer = ({ API_KEY, Address, type }) => {
  const [items, setItems] = useState([]);

  const fetchEmails = async () => {
    try {
      const url = new URL("http://localhost:8080/getEmail");
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("type", type);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY.current}`,
        },
      });

      if (response.ok) {
        const emails = await response.json();
        console.log("Emails fetched:", emails);

        // Map response to include border colors based on priority
        const formattedEmails = emails.map((email, index) => {
          let borderColor;
          console.log(email.priority?.toLowerCase())

          switch (email.priority?.toLowerCase()) {
            case "high":
              borderColor = "border-danger";
              break;
            case "medium":
              borderColor = "border-warning";
              break;
            case "low":
              borderColor = "border-success";
              break;
            default:
              borderColor = "border-secondary"; // Default if no priority
          }

          return {
            id: email.id || index + 1,
            fromAddress: email.fromAddress,
            subject: email.subject || "No Subject",
            body: email.body || "No Content",
            color: borderColor,
          };
        });

        setItems(formattedEmails);
      } else {
        console.error("Error fetching emails:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <div className="scrollable-container">
        {items.map((item) => (
          <Email
            key={item.id}
            className="scrollable-item"
            sender={item.fromAddress}
            header={item.subject}
            body={item.body}
            color={item.color} // Dynamic border color based on priority
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollableContainer;
