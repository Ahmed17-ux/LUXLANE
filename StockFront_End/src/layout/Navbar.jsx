import React, {  useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    MenuItem,
    IconButton,
  } from "@material-tailwind/react";
  import {

    Bars2Icon,
  } from "@heroicons/react/24/solid";
  import { Link, Outlet } from "react-router-dom";
import { HOME_PATH } from "../routes/routers";



// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(({ title, description }) => (
      <a href="#" key={title}>
        <MenuItem>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </MenuItem>
      </a>
    ));
  }

// nav list component
const navListItems = [
    {
      label: "Home",
      value: "home",
    },
    {
        label: "Shop",
        value: "",
    },
    {
      label: "SignUp",
      value:'signup',
    },
    {
      label: "Login",
      value: "login",
    },
    {
        label: "About us",
        value: "aboutus",
      },



  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center justify-center">
        <NavListMenu />
        {navListItems.map(({ value, label }) => (
          <Typography
            key={label}
            as={Link}
            to={value !== 'home' ? `/${value.toLowerCase()}` : HOME_PATH}
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2">
              <span className="text-gray-900">{label}</span>
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }

  export function Indexbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false),
      );
    }, []);

    return (
      <>
<div>
<Navbar className="fixed top-0 w-full z-50 h-46  rounded-sm rounded-b-none">
        <div className="flex items-center justify-start mx-auto text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2  text-2xl cursor-pointer py-1.5 font-medium"
          >
            LuxeLane
          </Typography>

          <div className="hidden lg:flex justify-center flex-grow">
            <NavList />
          </div>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>
      </Navbar>

      <div className="pt-16"> {/* Add padding-top to content to avoid being hidden behind navbar */}
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>

        <Outlet />
      </div>
    </div>


       </>
    );
  }
