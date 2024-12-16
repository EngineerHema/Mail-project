import React, { useState, useRef } from "react";
import styles from "../style/SearchBar.module.css"; 

const SearchBox = ({ substring }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    substring.current = e.target.value; 
   
  };

  return (
    <div className={styles["search-box"]}>
      <input
        type="text"
        value={value}
        placeholder={"Search..."}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBox;
