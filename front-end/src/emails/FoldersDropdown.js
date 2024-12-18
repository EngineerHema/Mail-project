import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function FoldersDropdown({ folders, onFolderSelect }) {
  // Set the initial selected folder or a placeholder if no folders exist
  const [selectedFolder, setSelectedFolder] = useState(folders.length > 0 ? folders[0] : 'No folders created');

  const handleSelect = (folder) => {
    console.log("Selected folder:", folder);
    setSelectedFolder(folder);
    onFolderSelect(folder);
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className='filter_list'>
      <NavDropdown
        id="nav-dropdown-folders"
        title={selectedFolder}
        menuVariant="dark"
        className='list'
      >
        {folders.length > 0 ? (
          folders.map((folder, index) => (
            <NavDropdown.Item key={index} onClick={() => handleSelect(folder)}>
              {folder}
            </NavDropdown.Item>
          ))
        ) : (
          <NavDropdown.Item disabled>
            No folders created
          </NavDropdown.Item>
        )}
      </NavDropdown>
    </Navbar>
  );
}

export default FoldersDropdown;
