import React, { ReactNode } from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-600 rounded-md text-white p-2 transition-colors duration-30 hover:bg-gray-700"
    >
      {text}
    </button>
  );
};

export default Button;
