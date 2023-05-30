import React from 'react';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      className='px-4 py-2 text-white rounded-sm bg-brand hover:brightness-110'
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
