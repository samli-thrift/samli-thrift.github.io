import { useState, useEffect, useId } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import '../scss/components/Searchbar.scss';

function SearchBar({ classNames = [] }) {
  const id = useId();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  // CHANGED: Shop reads "q", not "search". Only mirror it while on /shop.
  const urlQuery = pathname === '/shop' ? params.get('q') ?? '' : '';
  const [value, setValue] = useState(urlQuery);

  // keep the box in sync with the URL (back/forward, links from elsewhere)
  useEffect(() => { setValue(urlQuery); }, [urlQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    navigate({
      pathname: '/shop',
      search: q ? `?q=${encodeURIComponent(q)}` : '', // CHANGED: search -> q
    });
    e.currentTarget.querySelector('input')?.blur(); // closes the mobile keyboard
  }

  // NEW: clearing on /shop also removes the filter, so results update at once
  function handleClear() {
    setValue('');
    if (pathname === '/shop' && urlQuery) {
      navigate({ pathname: '/shop', search: '' });
    }
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
          onClick={handleClear}
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