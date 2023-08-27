import React, { useEffect, useState } from "react";
import {Input
} from "@material-tailwind/react";



export default function DisplayInput(props) {
    const handleChange = (e) => {
        props.setUpdatedData({ ...props.updatedData, [e.target.name]: e.target.value });
      };
    

  return (<>
  <div
                        className="px-4 py-2 font-semibold"
                        onChange={handleChange}
                        name={props.name}
                        
                      >
                        {props.label}
                      </div>
     <Input 
                        disabled={props.disabled}
                        onChange={handleChange}
                        name={props.name}
                        label={props.label}
                        value={props.updatedData.name}
                      />
                      
                      </>
  )
}
