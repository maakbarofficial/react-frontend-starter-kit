const InputWithSuffix = ({
  className,
  type = 'number',
  value,
  onChange,
  onClick,
  disabled = false,
  required = false,
  readOnly,
  suffix,
}) => {
  return (
    <div className={`${suffix ? "relative" : ""} inline-block`}>
      <input
        className={`table-input ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        onClick={onClick}
      />
      {suffix && (<span className="input-suffix">{suffix}</span>)}
    </div>
  );
};

export default InputWithSuffix;
