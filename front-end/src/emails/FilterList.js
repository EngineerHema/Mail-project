import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../style/SortList.css'; // Continue to use your custom CSS if needed for additional styling

function FilterList({ FilterMethod }) {
  const [method, setMethod] = useState("Filter Method");

  const handleSelect = (selectedMethod) => {
    console.log("Selected Method:", selectedMethod);
    if (FilterMethod && FilterMethod.current) {
      FilterMethod.current = selectedMethod;
    }
    setMethod(selectedMethod);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        {method}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
        <Dropdown.Item eventKey="Head">Head</Dropdown.Item>
        <Dropdown.Item eventKey="Body">Body</Dropdown.Item>
        <Dropdown.Item eventKey="Attachment">Attachment</Dropdown.Item>
        <Dropdown.Item eventKey="Sender">Sender</Dropdown.Item>
        <Dropdown.Item eventKey="Receiver">Receiver</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterList;
