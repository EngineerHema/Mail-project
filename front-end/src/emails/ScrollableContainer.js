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
  const { folders } = useFolderStore(); // Access folders directly from the store
  const [items, setItems] = useState([]);
  const [checkedEmails, setCheckedEmails] = useState([]); // State to store checked email IDs
  const sortMethod = useRef("PriorityHighToLow");
  const filterMethod = useRef("All");
  const substring = useRef("");
  const [currentFolder, setCurrentFolder] = useState("");




  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const url = new URL(`http://localhost:8080/deleteEmail`);
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("id", checkedEmails);
      console.log(Address.current,"hamdooooon", checkedEmails);

      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_KEY.current}` },
      });

      if (response.ok) console.log("Email deleted successfully");
      else console.error("Failed to delete email");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails(API_KEY, Address, type, setItems, substring, sortMethod, filterMethod);
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
      <button class="delete-button" onClick={handleDelete}>Delete</button>
      </div>

      {type === "inbox" && 
      <div>
      <FoldersDropdown folders={folders} onFolderSelect={handleFolderSelect} />
      <div>
        Currently viewing: {currentFolder}
        </div>
        </div>
          }
    

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
