  import axios from 'axios';
  import React, { createContext, useEffect, useState } from 'react';

  export const MyContext = createContext(null);

  const ContextStore = ({ children }) => {

      const [userInfo,setUserInfo] = useState()
      const [token,setToken] = useState(localStorage.getItem("token"))
      const url = "http://localhost:8080/api"

      const fetchUserInfo = async () => {
      try {
        console.log("context fetch running")
        const response = await axios.post(url + "/users/findById", {
          id : token
        });
        console.log("Context fetch :", response.data);
        setUserInfo(response.data)
      } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
      }
    };

      useEffect(() => {
        if(token){
          fetchUserInfo()
        }
      },[token])

      const contextValue = {
          userInfo,
          setUserInfo,
          url,
      }

    return (
      <MyContext.Provider value={contextValue}>
        {children}
      </MyContext.Provider>
    );
  };

  export default ContextStore;
