import { Input } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";

export default function PinInput({ control, errors, trigger, name, label }) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "PIN is required",
          // pattern: {

          //   value: /^[1-9][0-9]*$/,
          //   message: "Enter a valid pin",
          // },
          validate: {
            onlyNumbers: (value) =>
              /^\d+$/.test(value) || "PIN must contain only numbers",
            validLength: (value) =>
              value.length === 4 || "PIN must be 4 digits",
          },
        }}
        render={({ field }) => (
          <>
            <Input
              label={label}
              size="lg"
              {...field}
              type="password"
              required
              error={errors[name]?.message}
              onKeyUp={() => {
                trigger(`${name}`);
              }}
            />
            {errors[name] && (
              <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                {errors[name]?.message}
              </span>
            )}
          </>
        )}
      />
    </>
  );
}
