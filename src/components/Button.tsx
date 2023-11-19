import React from "react";
interface ButtonProps {
  children: string;
  onClick: () => void;
  color: string;
}
const Button = ({ children, onClick, color }: ButtonProps) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
