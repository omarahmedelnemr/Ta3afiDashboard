import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    `input-${size}`,
    `input-${variant}`,
    error && 'input-error',
    leftIcon && 'input-with-left-icon',
    rightIcon && 'input-with-right-icon',
    disabled && 'input-disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    fullWidth && 'input-container-full-width',
    containerClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input-label">
          {label}
          {props.required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {error && <span className="input-error-text">{error}</span>}
      {!error && helperText && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
