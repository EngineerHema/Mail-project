import React, { useState } from 'react';
import './Scrollablecontainer.css'; // Import the CSS file
import BorderExample from './Card';

const ScrollableContainer = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      content: `Item ${items.length + 1}`,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div>
      <button onClick={addItem} style={{ marginBottom: '10px' }}>
        Add Item
      </button>
      <div className="scrollable-container">
        {items.map((item) => (
          <div key={item.id} className="scrollable-item">
            <BorderExample/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableContainer;
