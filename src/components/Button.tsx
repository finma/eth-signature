import React from "react";

type ButtonType = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type: "primary" | "secondary";
};

const Button = ({ children, onClick, className, type }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`btn w-full md:w-96 rounded-2xl text-white ${
        type === "primary" ? "btn-primary" : "btn-secondary"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
