import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { LOGIN_PATH, PROFILE_INFO, SHOPING_PAGE } from "../routes/routers";
import { UserAPI } from "../service/api/User/UserApi";
import { UseUsercontext } from "../Contextapi/UserContext";

// Profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    url: "/profile/info",
  },
  {
    label: "LogOut",
    icon: PowerIcon,
    url: "logout",
  },
];

function ProfileMenu() {
  const { logout: ContextLogout ,user } = UseUsercontext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await UserAPI.logout();
    ContextLogout();
    navigate(LOGIN_PATH);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-600 p-0.5"
            src={`http://127.0.0.1:8000/storage/${user.image}`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, url, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();

                if (url === "logout") {
                  handleLogout();
                }

                if (url === "/profile/info") {
                  navigate(PROFILE_INFO);
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// Nav list component
const navListItems = [
  {
    label: "Dashboard",
    value: "user/dashboard",
    icon: "fg",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
    {navListItems.map(({ value, label }) => (
        <Typography
          key={label}
          as="a"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <Link to={`/${value.toLowerCase()}`}>
              <span className="text-gray-900">{label}</span>
            </Link>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
export function UserLayout_Dash() {
    const { setUser, setAuthanticated, logout } = UseUsercontext();
    const navigate = useNavigate();

    useEffect(() => {
      UserAPI.getUser('/user')
        .then(({ data }) => {
           setUser(data);
          setAuthanticated(true);
        })
        .catch((reason) => {
          logout();
          navigate(LOGIN_PATH);
        });
    }, []);

    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);

    return (
      <>
      <Navbar className="fixed top-0 left-0 right-0 mx-auto p-2 lg:pl-6 lg:rounded-none w-full lg:w-full mb-8 z-50">
        <div className="mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            LuxaLane
          </Typography>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </Navbar>
      <div className="w-auto relative" style={{ paddingTop: "56px" }}>
        <Outlet />
      </div>
      </>
    );
  }
