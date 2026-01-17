'use client';

interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password' | 'search';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input-field ${className}`}
      disabled={disabled}
      required={required}
    />
  );
}