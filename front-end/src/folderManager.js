import React, { useState } from "react";
import useFolderStore from './useFolderStore';
import './style/folderManager.css';
import axios from 'axios';

const FolderManager = ({API_KEY, emailAddress}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const { folders, addFolder, updateFolders, removeFolder, setFolders } = useFolderStore();


  const handleAddFolder = async () => {
    if (newFolderName.trim() === "") {
      alert("Folder name cannot be empty.");
      return;
    }
    
  addFolder(newFolderName);
  setNewFolderName(""); // Clear the input after adding the folder
    
    // Prepare the folder data for sending
  
    try {
      console.log(newFolderName);
      const response = await axios.post('http://localhost:8080/createFolder', newFolderName, {
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
  

  const handleRenameFolder = (index) => {
    const oldName = folders[index]
    const newName = prompt("Enter the new name for the folder:", folders[index]);
    if (newName && newName.trim() !== "") {
      const updatedFolders = folders.map((folder, i) => i === index ? newName.trim() : folder);
      updateFolders(updatedFolders);
    } else {
      alert("Folder name cannot be empty.");
    }
  };

  const handleDeleteFolder = (index) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      const updatedFolders = folders.filter((_, i) => i !== index);
      removeFolder(index); // We only need to update local state, backend handling is separate
    }
  };

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
            <span>{folder}</span>
            <button onClick={() => handleRenameFolder(index)} className="rename-folder-button">
              Rename
            </button>
            <button onClick={() => handleDeleteFolder(index)} className="delete-folder-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderManager;
