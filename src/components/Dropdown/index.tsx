import { useController } from "react-hook-form";

type Props = {};

const Select = ({ name, control, rules, id, label, ...props }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <label
        htmlFor="select"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          {...field}
          {...props}
          required
          className="rounded-full w-full"
        >
          <option value="" onClick={alert("javscript")}>Select...</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>
        {error && (
          <span className="text-red-600 text-sm font-semibold">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Select;