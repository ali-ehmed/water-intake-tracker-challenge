import React from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({ label, ...props }: FloatingInputProps) {
  return (
    <div className="relative z-0 w-full group">
      <input
        {...props}
        className="block py-3 px-2 w-full text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition placeholder-transparent"
        placeholder=" "
      />
      <label
        className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-2 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
