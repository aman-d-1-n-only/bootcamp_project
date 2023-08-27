import React from 'react';
import { Input } from '@material-tailwind/react';

export default function CustomPinInput({register, errors, trigger, name,label}) {
  return (
   <>
    <Input
                {...register(name, {  required: "PIN is required",
                validate: {
                  onlyNumbers: value => /^\d+$/.test(value) || "PIN must contain only numbers",
                  validLength: (value) =>
      value.length === 4 || "PIN must be 4 digits"
   }})}
                label={label}
                size="lg"
                type="password"
                required onKeyUp={() => {
                    trigger(name);
                  }}/>
             {errors[name] && <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">{errors[name]?.message}</span>}
             </>
  )
}
