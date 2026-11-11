import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Button,
  IconButton,
  Input,
  Textarea,

} from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';




import { Outlet, Link } from "react-router-dom";
import {  SHOPING_PAGE, TABLE_ORDERS, USER_DASHBOARD_PATH } from "../routes/routers";
import { UserAPI } from "../service/api/User/UserApi";


export function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openAcordin, setOpenAcordin] = useState(0);
  const [scrollCounter, setScrollCounter] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);


  const [openDr, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);
  const openDrawer = () => setOpen(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleOpen = (value) => {
    setOpenAcordin(openAcordin === value ? 0 : value);
    setOpen(open === value ? 0 : value);

  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      await UserAPI.SendReport(data);
      console.log("Report submitted successfully");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop || 0;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercent(Math.round(scrollPercent));
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>


      <div className={`flex `}>
        <div
          className={`flex mt-4 ${
            isSidebarOpen
              ? "translate-x-0 z-40 "
              : "-translate-x-full z-0 left-[-5rem]"} transition-transform ease-in-out duration-300 fixed    sm:w-64 md:w-72 `}
        >
          <div className="transition-all duration-300">
            <Card className={`p-4 shadow-2xl shadow-blue-gray-900/2 mx-4  `}>
              <div className="flex mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                  Sidebar User

                </Typography>
                <Button
                  onClick={toggleSidebar}
                  variant="text"
                  className="text-blue-gray flex items-center justify-end ml-auto rounded-full "
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>

              <List>
                <Link to={TABLE_ORDERS}>
                  <ListItem>
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg>
                    </ListItemPrefix>
                    My Orders
                  </ListItem>
                </Link>

                <Link>
                  <ListItem>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faCog} className="h-5 w-5" />
                    </ListItemPrefix>
                    Offres
                  </ListItem>
                </Link>

                <Link to={SHOPING_PAGE}>
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    Product
                  </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-50" />



                  <ListItem                         onClick={openDrawer}
>
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg>
                    </ListItemPrefix>
                    Report

                  </ListItem>
              </List>
            </Card>
          </div>
        </div>

        <div className="flex-grow flex items-start justify-center ">
          <Outlet />
        </div>
      </div>





{/* Drawer Report message */}
<Drawer open={openDr} onClose={closeDrawer}>
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Contact Us
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal">
            Write the message and then click button.
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input type="email" label="Email" {...register('email', { required: true })} />
          {errors.email && <span className="text-red-500">Email is required</span>}
          <Input label="Subject" {...register('subject')} />
          <Textarea rows={6} label="Message" {...register('content', { required: true })} />
          {errors.message && <span className="text-red-500">Message is required</span>}
          <Button type="submit">Send Message</Button>
        </form>
      </Drawer>
      {!isSidebarOpen && (
        <div className="fixed bottom-4 left-4 z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSidebar}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="animate-left-to-right flex justify-center items-center  w-3 h-3 cursor-pointer rounded-lg shadow-xl text-blue-900 p-2  border   border-blue-900  h-[35px] w-[40px]  bg-white"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      <div className="fixed bottom-4 right-6 z-50">
        <div className="w-14 h-14">
        <div className="absolute inset-0 flex justify-center items-center">
            <div
              className="w-full h-full  rounded-full"
              style={{ transform: "rotate(-90deg)" }}
            ></div>
            <div
              className="absolute inset-0  border-2 border-blue-900 border-dashed rounded-full"
              style={{
                transform: `rotate(${scrollPercent * 3.6}deg)`,
                overflow: "hidden", // Ensure the rounded corners are applied
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center ">
            <p className="text-blue-900  font-bold text-xs p-3 w-[55px] h-[55px]   flex items-center justify-center">{`${scrollPercent}%`}</p>
          </div>
        </div>
      </div>
    </>
  );
}





