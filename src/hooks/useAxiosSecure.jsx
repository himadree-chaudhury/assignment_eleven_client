import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// *Set Axios Base Configuration
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  // *Context Sates
  const { logOut } = useAuth();

  useEffect(() => {
    // *Interceptor To Handle Errors
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        // *Errors Check
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.status === 400
        ) {
          // *Log Out User And Redirect To Login Page
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
