import React from 'react'
import { CustomerCard } from './card';
import Navbar from './../pages/Navbar';
export const Customer = () => {
    return (
        <>   
            <Navbar/>
            <div className='flex flex-row p-2 m-2'>
                <CustomerCard cardName="add-customer" />
                <CustomerCard cardName="view-customer" />
                <CustomerCard cardName="transactions" />
            </div>
        </>
    )
}
