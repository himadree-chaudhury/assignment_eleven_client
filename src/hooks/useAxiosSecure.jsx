import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.status === 400
        ) {
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
