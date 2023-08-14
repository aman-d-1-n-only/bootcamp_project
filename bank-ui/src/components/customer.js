import React from 'react'
import { CustomerCard } from './card'
export const Customer = () => {
    return (
        <>
            <div className='flex flex-row p-2 m-2'>
                <CustomerCard cardName="add-customer" />
                <CustomerCard cardName="view-customer" />
                <CustomerCard cardName="Transactions" />
            </div>
        </>
    )
}
