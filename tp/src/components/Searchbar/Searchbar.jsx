import {useState} from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({placeholder, onSearch}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder || "Rechercher..."}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
                🔍
            </button>
        </div>
    );
};

export default SearchBar;
