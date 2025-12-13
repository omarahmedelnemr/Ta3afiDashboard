import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Select.css';

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  fullWidth = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  className = '',
  containerClassName = '',
  placeholder,
  ...props
}, ref) => {
  const selectClasses = [
    'select',
    `select-${size}`,
    `select-${variant}`,
    error && 'select-error',
    disabled && 'select-disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'select-container',
    fullWidth && 'select-container-full-width',
    containerClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="select-label">
          {label}
          {props.required && <span className="select-required">*</span>}
        </label>
      )}
      <div className="select-wrapper">
        <select
          ref={ref}
          className={selectClasses}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown} className="select-icon" />
      </div>
      {error && <span className="select-error-text">{error}</span>}
      {!error && helperText && <span className="select-helper-text">{helperText}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
