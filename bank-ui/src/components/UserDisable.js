import { Switch } from '@material-tailwind/react'
import React, { useState } from 'react'

export default function UserDisable() {
    const [isDisabled, setIsDisabled] = useState(false);
    const handleSwitchChange = () => {
      setIsDisabled(!isDisabled);
    };
    
    localStorage.setItem('disabled',isDisabled);
  return (
    <div>
      <div className="flex flex-col items-center py-3 justify-evenly md:flex-row
              ">
              <span className="sm:px-2 lg:mx-0 ">Enable</span>
              <span ><Switch 
        checked={isDisabled}
        onChange={handleSwitchChange}
         /></span>
              <span className="sm:px-2 lg:mx-0 ">Disable</span>
              </div>
               <div className={` w-full text-center ${isDisabled ? "text-red-900":"text-blue-900"}`}>{isDisabled ? 'User Disabled' : 'User Enabled'}</div>
    </div>
  )
}
