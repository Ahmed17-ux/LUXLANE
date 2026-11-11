import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Checkbox,
  IconButton
} from "@material-tailwind/react";
import '../IndexCssEditor.css';
import { formatDate } from '../../../ShareFun';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReportsApi from '../../service/api/User/ReportsApi';

const TABLE_HEAD = ["","#ID", "Email", "Subject", "Content", "Date Sent", "Date Reply", "Status"];

export default function Editor_UserReports() {
  const [sortByDate, setSortByDate] = useState(null);
  const [active, setActive] = useState(1);
  const [reports, setReports] = useState([]);
  const [checkedReports, setCheckedReports] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  const itemsPerPage = 10;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = active * itemsPerPage;

  const { data: reportsData, isLoading, isError } = useQuery('reports', async () => {
    const response = await ReportsApi.getAllReports();
    return response;
  });

  useEffect(() => {
    if (reportsData) {
      setReports(reportsData);
    }
  }, [reportsData]);

  const sortedReports = [...reports].sort((a, b) => {
    if (sortByDate === 'asc') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortByDate === 'desc') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return 0; // no sorting
    }
  }).slice(startIndex, endIndex);

  const totalPages = Math.ceil((reports.length || 0) / itemsPerPage);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const handleSortChange = (e) => {
    setSortByDate(e.target.checked ? e.target.value : null);
  };

  const toggleReportCheck = (report) => {
    const { id, status } = report;
    const isChecked = checkedReports.some(item => item.id === id);

    if (isChecked) {
      setCheckedReports(checkedReports.filter(item => item.id !== id));
      setSelectedStatus(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    } else {
      setCheckedReports([...checkedReports, { id, status }]);
      setSelectedStatus(prevState => ({ ...prevState, [id]: '' }));
    }
  };


  const saveCheckedReports = async () => {
    try {
      if (checkedReports.length === 0) {
        console.warn('No reports selected.');
        return;
      }

      const payload = {
        role:'editor',
        reports: checkedReports.map(report => ({
          id: report.id,
          status: selectedStatus[report.id] || '',
        }))
      };

      await ReportsApi.updateStatus(payload);
      console.log('Reports status updated successfully.');
    } catch (error) {
      console.error('Error updating reports status:', error);
    }
  };


  return (
    <>
      <Card className="mx-4 mt-[10%]">
        <CardHeader shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Reports list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex gap-4">
            <select
  className="rounded-lg border border-blue-500 px-3 py-1"
  value={selectedStatus[checkedReports[0]?.id] || ""}
  onChange={(e) => setSelectedStatus({ ...selectedStatus, [checkedReports[0]?.id]: e.target.value })}
>
  <option value="">Select Status</option>
  <option value="pending">Pending</option>
  <option value="completed">Completed</option>
  <option value="in progress">In Progress</option>
</select>

              <button
                onClick={saveCheckedReports}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedStatus || checkedReports.length === 0}
              >
                Save Change
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <div className='px-6'>
            <Checkbox
              color="indigo"
              value="desc"
              checked={sortByDate === 'desc'}
              onChange={handleSortChange}
              defaultChecked
            />
            <span className='font-semibold text-blue-900'>Newest to Oldest</span>
          </div>

          <table className="mt-4 text-center w-full">
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
                      <td colSpan="8" className=" text-center">
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
                      <Checkbox
                        onChange={() => toggleReportCheck({ id, status })}
                        checked={checkedReports.some(item => item.id === id)}
                      />
                    </td>
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
                    <td className="p-4 border-b border-blue-gray-50">
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
                        <Chip variant="ghost" size="sm" value={date_reply ? date_reply : 'Not yet'} />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70 w-[70px] break-all">{status}</Typography>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="flex items-center justify-center gap-8 my-12">
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
          <strong className="text-gray-900">{totalPages}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={active === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    </>
  );
}
