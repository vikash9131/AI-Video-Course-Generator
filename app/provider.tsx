"use client";
import axios from 'axios';
import {UserDetailContext} from '@/context/UserDetailContext';
import React, { useEffect, useState} from 'react'

function Provider({ children }: { children: React.ReactNode }) {


    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        CreateNewUser();
    }, [])

    const CreateNewUser = async () => {
        //user API endpoint call to create a new user
        const result=await axios.post('/api/user',{});
        console.log(result.data);
        setUserDetails(result.data);
    }

  return (
  <div>
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailContext.Provider>
  </div>
  )
}

export default Provider

