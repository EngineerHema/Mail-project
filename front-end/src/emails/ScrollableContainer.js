import React, { useState, useEffect, useRef } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';
import SearchBar from "./SearchBar";
import SortList from './SortList';
import FilterList from './FilterList';
import FoldersDropdown from './FoldersDropdown';
import { fetchEmails } from '../fetchEmails'; // Importing fetchEmails
import useFolderStore from '../useFolderStore'; // Import the store




const ScrollableContainer = ({ API_KEY, Address, type}) => {
  const [items, setItems] = useState([]);
  const [checkedEmails, setCheckedEmails] = useState([]); // State to store checked email IDs
  const sortMethod = useRef("PriorityHighToLow");
  const filterMethod = useRef("All");
  const substring = useRef("");
  const { folders,setFolders } = useFolderStore(); // Access folders directly from the store
  const [currentFolder, setCurrentFolder] = useState(folders[0] || "");



  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const url = new URL(`http://localhost:8080/deleteEmail`);
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("id", checkedEmails);
      url.searchParams.append("type", type);
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_KEY.current}` },
      });
      if (response.ok) console.log("email deleted")
      else console.error("Failed to delete email");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };


       

  const handleRestore = async (e) => {
    e.preventDefault();
    try {
      const url = new URL(`http://localhost:8080/restoreEmail`);
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("id", checkedEmails);
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${API_KEY.current}` },
      });


      if (response.ok) alert("Email restored successfully");
      else console.error("Failed to restored email");
    } catch (error) {
      console.error("Error restored email:", error);
    }
  };

  const handleAddtoFolder = async (e) => {
    e.preventDefault();
    try {
      const url = new URL(`http://localhost:8080/addToFolder`);
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("id", checkedEmails);
      url.searchParams.append("name", currentFolder);

      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${API_KEY.current}` },
      });

      if (response.ok) {console.log("added to folder successfully");
        alert("Email added to folder successfully");
      }

      else console.error("Failed to add email");
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  
  useEffect(() => {
    fetchEmails(API_KEY, Address, type, setItems, substring, sortMethod, filterMethod);
    
    const fetchFolders = async () => {
      const url = `http://localhost:8080/getFolders/${Address.current}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${API_KEY.current}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }
        const data = await response.json();
        setFolders(data);
        console.log("Fetched folders:", data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    
    fetchFolders();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleCheckboxToggle = (id, isChecked) => {
    setCheckedEmails((prevCheckedEmails) =>
      isChecked
        ? [...prevCheckedEmails, id] // Add email ID if checked
        : prevCheckedEmails.filter((emailId) => emailId !== id) // Remove email ID if unchecked
    );
  };

  useEffect(() => {
  }, [checkedEmails]);

  const handleFolderSelect = (folder) => {
    console.log("Folder changed to:", folder);
    setCurrentFolder(folder);
  };

  const handleApply = () => {
    // Make sure all references are current and valid
    fetchEmails(API_KEY, Address, type, setItems, substring, sortMethod, filterMethod);
    
  };
  


  return (
    <div className='page2'>
      <div className="scrollable-container">
        <div className='top-container'>
        <div className='allSearchFilter'>
  <div className='search_filter_container'>
    <SortList sortMethod={sortMethod}/>
    <FilterList FilterMethod={filterMethod}/>
    <SearchBar substring={substring}/>
    <div className="button-container">
    <button className="cool-button" onClick={handleApply}>Apply</button>
    <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  </div> 
</div>

      <div className='right-container'>
      {type === "inbox" && 
      <><FoldersDropdown folders={folders} onFolderSelect={handleFolderSelect} />
      <button className="move-button" onClick={handleAddtoFolder}>Move</button></>
          }

      {type === "trash" && 
      <><button className="move-button" onClick={handleRestore}>Restore</button></>
          }
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
              singleAddressDraft= {item.singleAddressDraft}
              toAddressDraft = {item.toAddressDraft}
              onCheckboxToggle={handleCheckboxToggle} // Pass the handler to Email component


            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableContainer;
