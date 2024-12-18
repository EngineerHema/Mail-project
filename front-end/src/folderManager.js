import React, { useEffect, useState } from "react";
import useFolderStore from './useFolderStore';
import './style/folderManager.css';
import axios from 'axios';
import { Link } from "react-router-dom";

const FolderManager = ({API_KEY, emailAddress}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const { folders, addFolder, updateFolders, removeFolder, setFolders } = useFolderStore();


  const handleAddFolder = async () => {
    if (newFolderName.trim() === "") {
      alert("Folder name cannot be empty.");
      return;
    }
    
    try {
      console.log(newFolderName);
      const response = await axios.post('http://localhost:8080/createFolder', {name:newFolderName,emailAddress:emailAddress.current}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY.current}` // Make sure API_KEY is correctly accessed here
        },
      });
  
      if (response.status === 200) {
        console.log("Folder added successfully!");
        // Add folder to the local state only if the backend operation is successful
        addFolder(newFolderName);
        setNewFolderName(""); // Clear the input after adding the folder
      } else {
        console.error("Failed to add folder");
      }
    } catch (error) {
      console.error("Error during folder addition:", error);
      alert('Something went wrong while adding the folder. Please try again later.');
    }
  };
  

  const handleRenameFolder = async (index) => {
    const oldName = folders[index];
    const newName = prompt("Enter the new name for the folder:", oldName);
  
    if (newName && newName.trim() !== "") {
      try {
        const response = await axios.put(
          'http://localhost:8080/modifyFolder',
          {
            oldName,
            newName,
            emailAddress: emailAddress.current, // Ensure this is set correctly
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY.current}`, // Ensure this is valid
              'Content-Type': 'application/json',
            },
          }
        );
  
        if(response.ok){
          const updatedFolders = folders.map((folder, i) =>
            i === index ? newName.trim() : folder
          );
          updateFolders(updatedFolders);
        }else{
          console.log("Not deleted!")
        }
        
      } catch (error) {
        console.error("Error renaming folder:", error);
        alert("Failed to rename the folder.");
      }
    } else {
      alert("Folder name cannot be empty.");
    }
  };

  const handleDeleteFolder = async (index) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/deleteFolder/${folders[index]}/${emailAddress.current}`, 
          {
            headers: {
              Authorization: `Bearer ${API_KEY.current}`, // Replace with your actual API key
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      const updatedFolders = folders.filter((_, i) => i !== index);
      removeFolder(index); // We only need to update local state, backend handling is separate
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const url = `http://localhost:8080/getFolders/${emailAddress.current}`;
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
  }, []);

  return (
    <div className="folder-manager-container">
      <h1 className="folder-manager-title">Folder Manager</h1>
      <div className="folder-input-container">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Enter folder name"
          className="folder-input"
        />
        <button onClick={handleAddFolder} className="add-folder-button">
          Add Folder
        </button>
      </div>
      <ul className="folder-list">
        {folders.map((folder, index) => (
          <li key={index} className="folder-item">

              <Link
              to="/folderPage"
              state={{ folder }}
              >
            <span>{folder}</span>
            </Link>

            <div>
            <button onClick={() => handleRenameFolder(index)} className="rename-folder-button">
              Rename
            </button>
            <button onClick={() => handleDeleteFolder(index)} className="delete-folder-button">
              Delete
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default FolderManager;