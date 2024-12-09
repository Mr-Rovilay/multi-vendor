import { server } from "@/server";
import axios from "axios";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    // Get the token from localStorage (or from a cookie if you're using cookies)
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${server}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      withCredentials: true, // If you're using cookies for authentication, include credentials
    });

    console.log(data);

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};
