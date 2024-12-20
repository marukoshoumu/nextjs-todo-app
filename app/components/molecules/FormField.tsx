import { Input } from "../atoms/Input";

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  required?: boolean;
};

/**
 * フォーム
 * @param   {string}label
 * @param   {string}type
 * @param   {string}  value
 * @param   {void}onChange
 * @param   {string}placeholder
 * @param   {number}maxLength
 * @param   {string}error
 * @param   {boolean}[required=false]
 * @returns
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  error,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={error ? "border-red-500" : ""}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
