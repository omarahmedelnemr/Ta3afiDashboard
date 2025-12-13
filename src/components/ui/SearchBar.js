import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  debounceTime = 300,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [localValue, debounceTime, onChange, value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleClear = useCallback(() => {
    setLocalValue('');
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  }, [onClear, onChange]);

  const searchBarClasses = [
    'search-bar',
    `search-bar-${size}`,
    fullWidth && 'search-bar-full-width',
    disabled && 'search-bar-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={searchBarClasses}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {localValue && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
