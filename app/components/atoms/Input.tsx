type InputProps = {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  required?: boolean;
};

/**
 * インプット
 * @param   {string}type
 * @param   {string}value
 * @param   {void}onChange
 * @param   {string}placeholder
 * @param   {number}maxLength
 * @param   {string}[className='']
 * @param   {boolean}[required='false']
 * @returns
 */
export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  className = "",
  required = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 w-full ${className}`}
      required={required}
    />
  );
};
