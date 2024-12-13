import React, { useState, useEffect } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';
import FilterList from './filter';
import SearchBar from "../SearchBar";


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
              borderColor = "danger";
              break;
            case "medium":
              borderColor = "warning";
              break;
            case "low":
              borderColor = "success";
              break;
            default:
              borderColor = email.priority?.toLowerCase(); // Default if no priority
          }

          return {
            id: email.id,
            fromAddress: email.fromAddress,
            toAddress : email.toAddress,
            subject: email.subject || "No Subject",
            body: email.body || "No Content",
            color: borderColor,
            type : type,
            time : email.timeStamp,
            attachments : email.attachments,
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
    <div className='page2'>
     
      <div className="scrollable-container">
        <div className='search_filter_container'>
        <FilterList/>
      <SearchBar/>
      </div>
        {items.length === 0 ? (
          <div className="no-emails-message">
            No Emails
          </div>
        ) : (
          items.map((item) => (
            <Email
              key={item.id}
              className="scrollable-item"
              sender={item.fromAddress}
              header={item.subject}
              body={item.body}
              color={item.color} 
              type={item.type}
              receiver={item.toAddress}
              time={item.time}
              attachments={item.attachments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableContainer;
