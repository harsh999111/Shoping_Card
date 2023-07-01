import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Component/Inputs';
import Dropdown from '../../Component/Dropdown';
import Checkbox from '../../Component/CheckBox';
import Radio from '../../Component/Radio';
import Select from '../../Component/Select';
import File from '../../Component/FileComponent';

const wait = (t) => new Promise((resolve) => setTimeout(resolve, t));

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    await wait(5000);
    console.log(data);
  };

  const calculateCheckboxSum = (selectedValues) => {
    return selectedValues.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue);
    }, 0);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        rules={{
          required: {
            value: true,
            message: 'Name is required.',
          },
        }}
        label="Name"
        id="name"
        autoComplete="name"
      />

      <Input
        control={control}
        name="email"
        rules={{
          required: {
            value: true,
            message: 'Email is required.',
          },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please provide a valid email address.',
          },
        }}
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
      />

      <Input
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: 'Password is required.',
          },
        }}
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
      />

      <Input
        control={control}
        name="confirmPassword"
        rules={{
          required: {
            value: true,
            message: 'Confirm Password is required.',
          },
          validate: (value) => {
            const { password } = getValues();
            return value === password || 'Password should match Confirm Password.';
          },
        }}
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
      />

      <Select
        control={control}
        name="hobbies"
        rules={{
          required: {
            value: true,
            message: 'Hobbies is Required..',
          },
        }}
        label="Hobbies"
        id="hobbies"
        placeholder="Please select hobby"
        options={[
          {
            value: 'cricket',
            text: 'Cricket',
          },
          {
            value: 'book',
            text: 'Book',
          },
        ]}
      />

      <Radio
        label="Gender"
        items={[
          {
            id: 'male',
            text: 'Male',
          },
          {
            id: 'female',
            text: 'Female',
          },
          {
            id: 'other',
            text: 'Other',
          },
        ]}
        name="gender"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Gender is Required..',
          },
        }}
      />

      <Checkbox
        label="CAR"
        items={[
          {
            id: 'Fortuner',
            text: 'Fortuner',
          },
          {
            id: 'THAR',
            text: 'THAR',
          },
          {
            id: 'BMW',
            text: 'BMW',
          },
        ]}
        name="check"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Checkbox is Required..',
          },
        }}
      />

<File
        control={control}
        name="avatar"
        rules={{
          required: {
            value: true,
            message: "avatar is Required..",
          },
        }}
        label="Avatar"
        id="avatar"
        multiple
      />

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
