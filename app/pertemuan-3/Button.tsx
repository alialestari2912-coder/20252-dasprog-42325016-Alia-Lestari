import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      {children}
    </button>
  );
}
