import React, { useState, useEffect, useRef } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';

import SearchBar from "./SearchBar";
import SortList from './SortList';
import FilterList from './FilterList';


const ScrollableContainer = ({ API_KEY, Address, type}) => {
  const [items, setItems] = useState([]);
  const sortMethod = useRef("PriorityHighToLow");
  const filterMethod = useRef("All");
  const substring = useRef("");
  const fetchEmails = async () => {
    try {
      console.log(substring.current)
      console.log(filterMethod.current)
      const url = new URL("http://localhost:8080/getEmail");
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("type", type);
      url.searchParams.append("substring", substring?.current || ""); ;
      url.searchParams.append("sort", sortMethod?.current.replace(/\s+/g,'') || "default");
      url.searchParams.append("search", filterMethod?.current.replace(/\s+/g,'') || "default"); 
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



  return (
    <div className='page2'>
      <div className="scrollable-container">
        <div className='allSearchFilter'>
        <div className='search_filter_container'>
        
        <SortList sortMethod={sortMethod}/>
        <FilterList FilterMethod={filterMethod}/>
        <SearchBar substring={substring}/>
        <div class="button-container">
        <button class="cool-button" onClick={fetchEmails}>Apply</button>
        </div>
      
      
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableContainer;
