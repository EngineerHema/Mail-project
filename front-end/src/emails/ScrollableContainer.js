import React, { useState, useEffect, useRef } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';
import FilterList from './filter';
import SearchBar from "./SearchBar";



const ScrollableContainer = ({ API_KEY, Address, type ,sortMethod}) => {
  const [items, setItems] = useState([]);
  const [checkedEmails, setCheckedEmails] = useState([]); // State to store checked email IDs

  const fetchEmails = async () => {
    try {
      const url = new URL("http://localhost:8080/getEmail");
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("type", type);
      url.searchParams.append("sort", sortMethod?.current.replace(/\s+/g,'') || "default"); 

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
              borderColor = "red";
              break;
            case "medium":
              borderColor = "yellow";
              break;
            case "low":
              borderColor = "green";
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

  const handleCheckboxToggle = (id, isChecked) => {

    setCheckedEmails((prevCheckedEmails) =>
      isChecked
        ? [...prevCheckedEmails, id] // Add email ID if checked
        : prevCheckedEmails.filter((emailId) => emailId !== id) // Remove email ID if unchecked
    );
  };

  useEffect(() => {
    console.log("Checked Emails Updated:", checkedEmails);
  }, [checkedEmails]);


  return (
    <div className='page2'>
      <div className="scrollable-container">
        <div className='allSearchFilter'>
        <div className='search_filter_container'>
        
        <FilterList sortMethod={sortMethod}/>
        <FilterList sortMethod={sortMethod}/>
        <SearchBar/>
      
      
      </div>
      </div>
        {items.length === 0 ? (
          <div className="no-emails-message">
            No Emails
          </div>
        ) : (
          items.map((item) => (
            <Email
              key={item.id}
              Address={Address}
              className="scrollable-item"
              id={item.id}
              sender={item.fromAddress}
              header={item.subject}
              body={item.body}
              color={item.color} 
              type={item.type}
              receiver={item.toAddress}
              time={item.time}
              attachments={item.attachments}
              API_KEY={API_KEY}
              onCheckboxToggle={handleCheckboxToggle} // Pass the handler to Email component
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableContainer;
