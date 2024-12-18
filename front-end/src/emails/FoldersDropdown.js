import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../style/SortList.css'; // Only if you need extra custom styles

function FoldersDropdown({ folders, onFolderSelect }) {
  const [selectedFolder, setSelectedFolder] = useState(folders.length > 0 ? folders[0] : 'Folders');

  const handleSelect = (folder) => {
    setSelectedFolder(folder);
    onFolderSelect(folder);
  };

  return (
    <Dropdown onSelect={handleSelect} >
      <Dropdown.Toggle  id="dropdown-basic" className='folder-toggle'>
        {selectedFolder}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {folders.length > 0 ? (
          folders.map((folder, index) => (
            <Dropdown.Item key={index} eventKey={folder}>
              {folder}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No folders created</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FoldersDropdown;
