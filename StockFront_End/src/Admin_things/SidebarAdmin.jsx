import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
    ShoppingBagIcon,

  } from "@heroicons/react/24/solid";


import { ChevronDownIcon} from "@heroicons/react/24/outline";
import { Outlet, Link } from "react-router-dom";
import { ADMIN_ADD_EDITOR, ADMIN_ALL_EDITOR_VIEW, ADMIN_LIST_USERS, ALLPRODUCTS_LIST_ADMIN, DASHBORD_CONTRLLE, REPORTS } from "../routes/routers";


export function SidebarAdmin() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openAcordin, setOpenAcordin] = useState(0);

  const [open, setOpen] = React.useState(0);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleOpen = (value) => {
    setOpenAcordin(openAcordin === value ? 0 : value);
    setOpen(open === value ? 0 : value);

  };



  return (
    <>
     {!isSidebarOpen && (
       <div class="fixed top-16 left-4 z-50 ">

<svg xmlns="http://www.w3.org/2000/svg" onClick={toggleSidebar} viewBox="0 0 24 24" fill="currentColor" className="animate-left-to-right flex justify-center items-center  w-3 h-3 cursor-pointer rounded-lg shadow-xl text-blue-900 p-2  border   border-blue-900  h-[35px] w-[40px]  bg-white">
<path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>



        </div>
      )}

      <div className={`flex`}>
        <div
          className={`flex ${
            isSidebarOpen
              ? "translate-x-0 z-40 "
              : "-translate-x-full z-0 left-[-5rem]"} transition-transform ease-in-out duration-300 fixed    sm:w-64 md:w-72 `}
        >
          <div className="transition-all duration-300">
            <Card className={`p-4 shadow-2xl shadow-blue-gray-900/2 mx-4  `}>
              <div className="flex mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                Control Bar
                </Typography>
                <Button
                  onClick={toggleSidebar}
                  variant="text"
                  className="text-blue-gray flex items-center justify-end ml-auto rounded-full border "
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>

              <List>
              <Link to={DASHBORD_CONTRLLE}>
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
                   Dashboard
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

                <Link to={ALLPRODUCTS_LIST_ADMIN}>
                  <ListItem>
                    <ListItemPrefix>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clip-rule="evenodd" />
</svg>


                    </ListItemPrefix>
                   All Products
                  </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-50" />

                <Accordion
                  open={openAcordin === 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        openAcordin === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openAcordin === 1}>
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        About Editors
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                    <Link to={REPORTS}>
                    <ListItem className="flex items-center justify-center">
                    <ListItemPrefix>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clip-rule="evenodd" />
</svg>

                    </ListItemPrefix>
                    Editors Reports
                  </ListItem>
</Link>
                      <Link to={ADMIN_ADD_EDITOR}>
                        <ListItem className="flex items-center justify-center">
                        <ListItemPrefix>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                          </svg>
                        </ListItemPrefix>
                          Add Editor
                        </ListItem>
                      </Link>




                    <Link to={ADMIN_ALL_EDITOR_VIEW}>


                    <ListItem className="flex items-center justify-center">
                        <ListItemPrefix>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
</svg>

                        </ListItemPrefix>
                       All Editors
                      </ListItem>




                    </Link>
                    </List>
                  </AccordionBody>
                </Accordion>

                <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-800">
  <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
</svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               About User
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
           <Link to={ADMIN_LIST_USERS}>
           <List className="pl-3">
              <ListItem>

                All Users
              </ListItem>
            </List>
            </Link>
            <Link to={REPORTS}>
            <List className="pl-3">
              <ListItem>

                User Report
              </ListItem>
            </List>
            </Link>
          </AccordionBody>
        </Accordion>
        <Link>

                </Link>
              </List>
            </Card>
          </div>
        </div>

        <div className="flex-grow  items-start justify-center mt-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
