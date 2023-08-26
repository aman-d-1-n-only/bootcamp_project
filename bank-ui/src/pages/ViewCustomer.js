import React, { useState, useEffect } from 'react';
import { Button, Input, IconButton, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import CustomerProfile from './CustomerProfile'; // Import your CustomerProfile component

export default function ViewCustomer() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const TABLE_HEAD = [
    "Customer ID",
    "Name",
    "Address",
    "City",
    "Email",
    "Contact",
    "Pincode",
    "View Profile"
  ];


  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    filterList(event.target.value);
  };

  const filterList = (searchInput) => {
    const filtered = data.filter((row) =>
      row.custId === parseInt(searchInput)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5165/api/Customer', {
        headers: {
          Authorization: 'bearer ' + jwtToken,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className='flex items-center justify-center my-4 w-full'>
        <Input
          type='text'
          placeholder='Enter Customer ID'
          className='w-fit lg:w-1/3'
          value={searchInput}
          onChange={handleChange}
          size='lg'
          append={
            <IconButton>
             <MagnifyingGlassIcon/>
            </IconButton>
          }
        />
      </div>

      <div className='mx-auto'>
        <table className='min-w-full'>
          <thead>
          <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-80"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
          </thead>
          <tbody>
            {searchInput
              ? filteredData.map((row) => (
                <tr key={row.custId} className='bg-white'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {row.custId}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.address}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.city}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.contact}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.pincode}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <Button onClick={() => navigate('/customer/customer-profile', { state: { data1: row } })}>View</Button>
                    </td>
                  </tr>
                ))
              : data.map((row) => (
                  <tr key={row.custId} className='bg-white'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {row.custId}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.address}
                      </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.city}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.email}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.contact}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {row.pincode}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <Button onClick={() => navigate('/customer/customer-profile', { state: { data1: row } })}>View</Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
