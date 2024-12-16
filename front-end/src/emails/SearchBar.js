import React, { useState } from "react";
import styles from "../style/SearchBar.module.css"; // Import CSS module

const SearchBox = ({ placeholder = "Search..." }) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className={styles["search-box"]}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
    
    </div>
  );
};

export default SearchBox;
