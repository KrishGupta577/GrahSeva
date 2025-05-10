import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext(null);

const ContextStore = ({ children }) => {

  const [colorTheme,setColorTheme] = useState("light")
  const [userInfo, setUserInfo] = useState()
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [activeServices, setActiveServices] = useState([])
  const url = "http://localhost:8080/api"

  const fetchUserInfo = async () => {
    try {
      const response = await axios.post(url + "/users/findById", {
        id: token
      });
      setUserInfo(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActiveServices = async () => {
    try {
      const response = await axios.post(url + "/active-services/user-id", {
        userId: token
      })
      setActiveServices(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserInfo()
      fetchActiveServices()
    }
  }, [token])

  const contextValue = {
    userInfo,
    setUserInfo,
    url,
    activeServices,
    setActiveServices,
    colorTheme,
    setColorTheme
  }

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextStore;
