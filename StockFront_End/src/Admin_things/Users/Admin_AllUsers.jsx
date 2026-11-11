import React, { useState } from 'react';
import { AdminApi } from '../../service/api/User/AdminApi';
import { useQuery } from 'react-query';
import { formatDate } from '../../../ShareFun';
import '../IndexCssAdmin.css';
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Admin_AllUsers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [active, setActive] = useState(1);

    const { data: users, isLoading, isError } = useQuery('users', async () => {
        const response = await AdminApi.AllUsers();
        return response;
    });

    const handleSearchWithName = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    }


    const handleSortByCreatedAt = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    const sortedUsers = users ? [...users.data] : [];

    sortedUsers.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery)
    );


    const usersPerPage = 10;
    const indexOfLastUser = active * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const next = () => {
        if (active === Math.ceil(filteredUsers.length / usersPerPage)) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <>
            <div className="my-4 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                    <div className="flex justify-between">
                        <div className="inline-flex border rounded border-blue-900  px-2 lg:px-6 h-12 bg-transparent">
                            <div className="flex flex-wrap items-stretch w-full gap-8 h-full mb-6 relative">
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                        <svg
                                            width="18"
                                            height="18"
                                            className="w-4 lg:w-auto"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                                                stroke="#455A64"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M16.9993 16.9993L13.1328 13.1328"
                                                stroke="#455A64"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchWithName}
                                    className="flex-shrink flex-grow flex-auto leading-normal tracking-wide flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <table className="">
                        <thead>
                            <tr >
                                <th className="px-6 py-3 w-1/8 border-b-2 border-gray-300 text-left leading-4  text-blue-900 tracking-wider font-semibold">ID</th>
                                <th className="px-6 py-3 w-1/6 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider">Fullname</th>
                                <th className="px-6 py-3 w-1/6 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider">Last Name</th>
                                <th className="px-6 py-3 w-1/4 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider">Email</th>
                                <th className="px-6 py-3 w-1/6 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider">Phone</th>
                                <th className="px-6 py-3 w-1/6 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider cursor-pointer" onClick={handleSortByCreatedAt}>
                                    Created At
                                    {sortOrder === 'asc' ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
                                </th>
                                <th className="px-6 py-3 w-1/6 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-900 tracking-wider">Email verified At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center">
                                        <div className="loader">
                                            <div className="justify-content-center jimu-primary-loading"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5  font-bold">#{user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{user.name}</td>
                                        <td className=" whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{user.last_name}</td>
                                        <td className=" whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{user.email}</td>
                                        <td className="whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{user.phone ? user.phone : "N/A"}</td>
                                        <td className=" whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{formatDate(user.created_at)}</td>
                                        <td className=" whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-blue-900">{user.email_verified_at ? formatDate(user.email_verified_at) : "Not yet"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex w-full  items-center justify-center my-4 gap-10">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">{Math.ceil(filteredUsers.length / usersPerPage)}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === Math.ceil(filteredUsers.length / usersPerPage)}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </>
    );
}

export default Admin_AllUsers;
