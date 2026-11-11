import { useState, useEffect, useId } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../scss/components/Searchbar.scss';

function SearchBar({ classNames = [] }) {
  const id = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const urlQuery = params.get('search') ?? '';
  const [value, setValue] = useState(urlQuery);

  // keep the box in sync with the URL (back/forward, links from elsewhere)
  useEffect(() => { setValue(urlQuery); }, [urlQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    navigate({
      pathname: '/shop',
      search: q ? `?search=${encodeURIComponent(q)}` : '',
    });
    e.currentTarget.querySelector('input')?.blur(); // closes the mobile keyboard
  }

  return (
    <form
      className={`Searchbar ${classNames.join(' ')}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        id={id}
        type="search"
        value={value}
        placeholder="Search SamLi..."
        aria-label="Search products"
        autoComplete="off"
        enterKeyHint="search"
        onChange={(e) => setValue(e.target.value)}
      />

      {value && (
        <button
          type="button"
          className="clear-btn"
          aria-label="Clear search"
          onClick={() => setValue('')}
        >
          <i className="icon-close"></i>
        </button>
      )}

      <button type="submit" className="search-btn" aria-label="Search">
        <i className="icon-search1"></i>
      </button>
    </form>
  );
}

export default SearchBar;