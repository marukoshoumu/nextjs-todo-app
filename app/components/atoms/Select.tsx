import React from 'react'

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options, className = '' }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 w-full ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}