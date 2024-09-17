import React, { ReactNode } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} bg-gray-600 rounded-md text-white p-2 transition-colors duration-30 hover:bg-gray-700`}
    >
      {children}
    </button>
  );
};

export default Button;
