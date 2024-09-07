import { ChangeEvent } from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
  name,
}: LabelledInputType) {
  return (
    <div className="mt-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
