import React, { useState } from 'react';
import FolderManager from './folderManager';
import ScrollableContainer from './ScrollableContainer';

const ParentComponent = ({ API_KEY, Address, type }) => {
    const [folders, setFolders] = useState([]);

    return (
        <div>
            <FolderManager folders={folders} setFolders={setFolders} />
            <ScrollableContainer folders={folders} API_KEY={API_KEY} Address={Address} type={type} />
        </div>
    );
};

export default ParentComponent;
