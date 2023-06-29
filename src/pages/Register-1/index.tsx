import { useForm } from "react-hook-form";
import Input from "../../Inputs";

const wait = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

type Props = {};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await wait(5000);
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        rules={{
          required: {
            value: true,
            message: "Name is Required..",
          },
        }}
        label="Name"
        id="name"
        autoComplete="name"
      />
      {/* Dropdown for selecting user role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          User Role
        </label>
        <div className={`mt-2 ${errors.role ? "shake" : ""}`}>
          <select
            id="role"
            name="role"
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              errors.role ? "ring-red-500" : ""
            }`}
            {...register("role", {
              required: {
                value: true,
                message: "User Role is required.",
              },
            })}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && (
            <span className="text-red-400 text-sm font-semibold">
              {errors.role.message}
            </span>
          )}
        </div>
      </div>
      {/* End of dropdown */}

      <Input
        control={control}
        rules={{
          required: {
            value: true,
            message: "Email is Required..",
          },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Please Provide valid email address",
          },
        }}
        name="email"
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
      />
      {/* Rest of the form fields */}
      {/* ... */}

      <div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Register;
