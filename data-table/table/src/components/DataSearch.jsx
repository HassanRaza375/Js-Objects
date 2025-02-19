import React, { useRef } from "react";

const SearchTable = ({ event }) => {
    const searchInputValue = useRef("");

    const handleInputChange = () => {
        if (event) {
            event(searchInputValue.current.value); // Pass the current value to the event function
        }
    };

    return (
        <input
            type="text"
            ref={searchInputValue}
            onInput={handleInputChange}
            className="search"
        />
    );
};

export default SearchTable;
