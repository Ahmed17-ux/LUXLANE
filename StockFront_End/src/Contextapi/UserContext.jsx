import { createContext, useContext, useState } from "react";
import { UserAPI } from "../service/api/User/UserApi";


export const User_StateContext = createContext({
    user: {},
    Authanticated: false,
    setUser: () => {},
    login: (email, password) => {},
    logout: () => {}, // Removed the incorrect call here

    setAuthanticated: () => {},
    setToken: () => {},
  });

  function UserContext({ children }) {
    const [user, setUser] = useState({});

    const [Authanticated, _setAuthanticated] = useState(
      window.localStorage.getItem("Authanticated") === "true"
    );

    // Login
    const login = async (email, password) => {
      return UserAPI.login(email, password);
    };

    const logout = () => {
        setUser({});
        _setAuthanticated(false);
        window.localStorage.removeItem("Authanticated");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("role");
      };


    const setAuthanticated = (isAuthanticated) => {
      _setAuthanticated(isAuthanticated);
      window.localStorage.setItem("Authanticated", isAuthanticated);
    };

    const setToken = (token) => {
      window.localStorage.setItem("token", token);
    };

    return (
      <div>
        <User_StateContext.Provider
          value={{
            user,
            setUser,
            login,
            Authanticated,
            logout,
            setAuthanticated,
            setToken,
          }}
        >
          {children}
        </User_StateContext.Provider>
      </div>
    );
  }


export const UseUsercontext = () => useContext(User_StateContext);

export default UserContext;
