interface InputProps {
  value: string;
  error?: string | [] | null;
  placeholder?: string;
  inputType: string;
  onChange: any;
}
const Input = ({
  value,
  placeholder,
  inputType,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className="">
      {inputType === "text" && (
        <input
          placeholder={placeholder}
          type="text"
          className="border border-gray-300 rounded-md h-11 px-2 w-full"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export { Input };
