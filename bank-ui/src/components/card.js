import React from "react";
import { useNavigate } from 'react-router-dom';

export const CustomerCard = (props) => {
    const navigate = useNavigate()
    return (
        <div className="grid m-2 h-15 w-15 border-4 border-black-500 p-2">


            <button className="mb-2"
                onClick={() => navigate('customerDetails')}>
                {props.cardName}
            </button>



        </div>
    );
}