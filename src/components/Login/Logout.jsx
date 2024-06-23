import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux/userSlice";


const useLogoutOnClose = async() => {

    const dispatch = useDispatch();
    dispatch(loginSuccess(null));

    useEffect(() => {
      const handleBeforeUnload = async() => {   
        await axios.put("https://scholary-tube-server.vercel.app/api/users/logout").then((res)=>{
            console.log("Logged out");
        })
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
    }, []);
  };

export default useLogoutOnClose;
