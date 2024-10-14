import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface SearchBarProps {
  onAttachClick: () => void;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAttachClick, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-xl p-2 mx-14">
      <input
        type="text"
        placeholder="Search or type a message..."
        className="flex-grow outline-none px-4 py-2 rounded-full bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch} className="ml-2">
        Search
      </button>
      <button onClick={onAttachClick} className="ml-2">
        <AttachFileIcon style={{ color: "#555" }} />
      </button>
    </div>
  );
};

export default SearchBar;
