import React, { useState, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../style/SortList.css';  // Assuming you might still want to apply custom styles

function SortList({ sortMethod }) {
  const [method, setMethod] = useState("PriorityHighToLow");
  const methodRef = useRef(method); // Use ref to ensure up-to-date access inside callbacks

  const handleSelect = (selectedMethod) => {
    console.log("Selected Method:", selectedMethod);
    methodRef.current = selectedMethod;  // Update ref
    if (sortMethod && sortMethod.current) {
      sortMethod.current = selectedMethod; // Update sortMethod if it's provided as a ref
    }
    setMethod(selectedMethod); // Update the local state
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={methodRef.current}
      className="sort-dropdown" // Additional custom classes if needed
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="Time Old To New">Time old to new</Dropdown.Item>
      <Dropdown.Item eventKey="Time New To Old">Time new to old</Dropdown.Item>
      <Dropdown.Item eventKey="Priority High To Low">Priority high to low</Dropdown.Item>
      <Dropdown.Item eventKey="Priority Low To High">Priority low to high</Dropdown.Item>
    </DropdownButton>
  );
}

export default SortList;
