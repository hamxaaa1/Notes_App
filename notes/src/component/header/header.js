import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { setFilteredSearchNote } from "../feature/slice";
import "./header.css"; // Keep your custom styles if any

const Header = () => {
  const [search, setSearch] = useState("");
  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    handleSearchNote();
  }, [search]);

  const handleSearchNote = () => {
    const newNote = state.notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    if (search.trim() !== "") {
      dispatch(setFilteredSearchNote(newNote));
    } else {
      dispatch(setFilteredSearchNote(state.notes));
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="bg-white shadow-md p-4" style={{marginBottom: 20}}>
      <div className="max-w-2xl mx-auto flex items-center">
        <form className="flex w-full">
          <input
            type="text"
            value={search}
            placeholder="Search notes..."
            className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 transition duration-200 flex items-center"
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
