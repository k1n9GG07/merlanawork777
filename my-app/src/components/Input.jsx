import './Input.css';

const Input = ({ value, onChange, placeholder, onKeyDown }) => {
  return (
    <input
      className="custom-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;