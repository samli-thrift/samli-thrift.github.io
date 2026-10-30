

import { useState } from 'react';
import '../scss/components/Searchbar.scss';
import { useNavigate } from 'react-router-dom';

function SearchBar({
  classNames = [],
}) {
  const [value, setValue] = useState('');
  const navigate = useNavigate()

  function handleSearch() {
    navigate({
      pathname: "/shop",
      searchParams: `?search=${value}`,
    });
    // Supposed to work.
  };

  return <form className={`Searchbar ${classNames && classNames.join(' ')}`}>
    <input
      type="search"
      id='search_input'
      value={value}
      placeholder='Search Samli...'
      onChange={(e) => setValue(e.target.value)}
    />
    <button
      className="search-btn"
      onClick={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <i className="icon-search1"></i>
    </button>
  </form>;
}

export default SearchBar;