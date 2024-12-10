import React, { useState, useEffect } from 'react';
import '../style/Scrollablecontainer.css';
import Email from './Card';

const ScrollableContainer = () => {
  const [items, setItems] = useState([]);

  // Using useEffect to populate items when the component mounts
  useEffect(() => {
    const newItems = [];
    for (let index = 0; index < 10; index++) {
      const newItem = {
        id: items.length + 1, // This needs to be adjusted if the state is updated asynchronously
        sender: `kero samy`,
        header: `kero`,
        body: `kero kero`,
        color: index % 2 === 0 ? 'primary' : 'success', // Use index for color assignment
      };
      newItems.push(newItem);
    }

    // Now set the items to the state
    setItems((prevItems) => [...prevItems, ...newItems]);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <div className="scrollable-container">
        {items.map((item) => (
          <div key={item.id} className="scrollable-item">
            <Email
              sender={item.sender}
              header={item.header}
              body={item.body}
              color={item.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableContainer;
