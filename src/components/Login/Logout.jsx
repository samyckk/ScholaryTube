import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux/userSlice";


const useLogoutOnClose = async() => {

    const dispatch = useDispatch();

    useEffect(() => {
      const handleBeforeUnload = async() => {
        dispatch(loginSuccess(null));
        await axios.put("http://localhost:8080/api/users/logout").then((res)=>{
            console.log("Logged out");
        })
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
    }, []);
  };

export default useLogoutOnClose;