import React from 'react'
import { CustomerCard } from './card'
export const Customer = () => {
    return (
        <>
            <CustomerCard cardName="Add Customer Details" />
            <CustomerCard cardName="View Customer Details" />
            <CustomerCard cardName="Transactions" />
        </>
    )
}
