import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/folderManager.css"; // Import the CSS file

const FolderManager = () => {
  const [folders, setFolders] = useState([]); // State to store folder names
  const [newFolderName, setNewFolderName] = useState("");

  // Function to handle adding a folder
  const handleAddFolder = () => {
    if (newFolderName.trim() === "") {
      alert("Folder name cannot be empty.");
      return;
    }
    setFolders((prevFolders) => {
      const updatedFolders = [...prevFolders, newFolderName];
      sendFoldersToBackend(updatedFolders);
      return updatedFolders;
    });
    setNewFolderName(""); // Clear input
  };

  // Function to handle renaming a folder
  const handleRenameFolder = (index) => {
    const newName = prompt("Enter the new name for the folder:");
    if (newName && newName.trim() !== "") {
      setFolders((prevFolders) => {
        const updatedFolders = [...prevFolders];
        updatedFolders[index] = newName.trim();
        sendFoldersToBackend(updatedFolders);
        return updatedFolders;
      });
    } else {
      alert("Folder name cannot be empty.");
    }
  };

  // Function to handle deleting a folder
  const handleDeleteFolder = (index) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      setFolders((prevFolders) => {
        const updatedFolders = prevFolders.filter((_, i) => i !== index);
        sendFoldersToBackend(updatedFolders);
        return updatedFolders;
      });
    }
  };

  // Function to send folders to the backend
  const sendFoldersToBackend = async (folders) => {
    try {
      console.log(folders);
      const response = await axios.post(`http://localhost:8080/updateFolders`, folders, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Folders sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending folders to backend:", error);
    }
  };

  return (
    <div className="folder-manager-container">
      <h1 className="folder-manager-title">Folder Manager</h1>

      {/* Input to add a new folder */}
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

      {/* List of folders */}
      <ul className="folder-list">
        {folders.map((folder, index) => (
          <li key={index} className="folder-item">
            <Link to="/folderPage" state={{ folder }} className="folder-link">
              <span>{folder}</span>
            </Link>
            <div className="folder-actions">
              <button
                onClick={() => handleRenameFolder(index)}
                className="rename-folder-button"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteFolder(index)}
                className="delete-folder-button"
              >
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
