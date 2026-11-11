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
import { FontAwesomeIcon }
from "@fortawesome/react-fontawesome";
import {
  faTimes,
    } from "@fortawesome/free-solid-svg-icons";

import { ChevronDownIcon } from "@heroicons/react/24/outline";





import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { PRODUCT_LIST, PRODUCT_FORM, BASE_CATEGORY_PATH, EDITOR_DASHBOARD_CONTROLLE, EDITOR_USERREPORTS } from "../routes/routers";


export function SidebarEditor() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState();


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
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

      <div className={`flex `}>
        <div
          className={`flex mt-[4rem] ${
            isSidebarOpen
              ? "translate-x-0 z-40 "
              : "-translate-x-full z-0 left-[-5rem]"} transition-transform ease-in-out duration-300 fixed    sm:w-64 md:w-72 `}
        >
          <div className="transition-all duration-300">
            <Card className={`p-4 shadow-2xl shadow-blue-gray-900/2 mx-4  `}>
              <div className="flex mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                  Sidebar Editor
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

              <Link to={EDITOR_DASHBOARD_CONTROLLE}>
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


{/* Products side */}
    <Accordion
                  open={open === 0}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open ===0 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === 0}>
                    <AccordionHeader
                      onClick={() => handleOpen(0)}
                      className="border-b-0 p-3"
                    >
            <ListItemPrefix>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>

            </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        Products
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0 ">
                      <Link  to={PRODUCT_FORM}>
                        <ListItem >
                        <ListItemPrefix>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    </ListItemPrefix>
                          Add Product
                        </ListItem>
                      </Link>



                    <Link to={PRODUCT_LIST}>

                    <ListItem >
                        <ListItemPrefix>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>

                        </ListItemPrefix>
                       All Product
                      </ListItem>
                    </Link>

                    </List>
                  </AccordionBody>
    </Accordion>

{/* Categories Side */}
<Link to={BASE_CATEGORY_PATH}>
<ListItem >
                <ListItemPrefix>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

                </ListItemPrefix>

                Categories
              </ListItem>

</Link>

{/* Offres Side */}

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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z" />
</svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Offres
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
          <List >
          <ListItem className="">
                    <ListItemPrefix>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    </ListItemPrefix>
                Add Offres
              </ListItem>
            </List>
          </AccordionBody>
    </Accordion>

     <hr className="my-2 border-blue-gray-50" />
{/* Reports */}

   <Link to={EDITOR_USERREPORTS}>
   <ListItem>
            <ListItemPrefix>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clip-rule="evenodd" />
    </svg>

            </ListItemPrefix>
            Reports
    </ListItem>
   </Link>

    <ListItem>
            <ListItemPrefix>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>



            </ListItemPrefix>
            Suppliers
    </ListItem>

        </List>
            </Card>
          </div>
        </div>

        <div className=" item-center justify-center  w-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
  }
