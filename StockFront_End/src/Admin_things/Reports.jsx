import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Checkbox,
} from "@material-tailwind/react";
import { UserAPI } from '../service/api/User/UserApi'
import { formatDate } from '../../ShareFun';
import './IndexCssAdmin.css';


const TABLE_HEAD = ["#ID","Email", "Subject", "Content", "Date Sent", "Date Reply", "Status"];

export function Reports() {
  const [sortByDate, setSortByDate] = useState(null); 
  const { data: reports, isLoading, isError } = useQuery('reports', async () => {
    const response = await UserAPI.getAllReports();
    return response;
  });

  const sortedReports = [...(reports || [])].sort((a, b) => {
    if (sortByDate === 'asc') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortByDate === 'desc') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return 0; // no sorting
    }
  });

  const handleSortChange = (e) => {
    setSortByDate(e.target.checked ? e.target.value : null);
  };

  return (
    <Card className="h-full mx-4 m-8 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Reports list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>

        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
      <div className='px-6'>


<Checkbox color="indigo"  value="desc"
  checked={sortByDate === 'desc'}
  onChange={handleSortChange} defaultChecked />
<span className='font-semibold text-blue-900'>Newest to Oldest</span>
</div>
        <table className="mt-4  text-center w-full">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 border-b border-blue-gray-50">
                  <div className="flex justify-center items-center">
                    <td colSpan="8" className="py-4 text-center">
                      <div className="loader">
                        <div className="justify-content-center jimu-primary-loading"></div>
                      </div>
                    </td>
                  </div>
                </td>
              </tr>
            ) : (
              sortedReports?.map(({ id, email, content, subject, created_at, date_reply, status }) => (
                <tr key={id}>
                     <td className="p-4 border-b border-blue-gray-50">
                    <div className=" items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">#{id}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className=" items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">{email}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 " >
                    <span className='w-[250px] break-all'>{subject}</span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 break-words">
                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70 w-[250px] break-all">{content}</Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Chip variant="ghost" size="sm" value={formatDate(created_at)} />
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Chip variant="ghost" size="sm" value={date_reply} />
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
