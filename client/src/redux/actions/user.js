import api from "@/utils/server";


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    
    const { data } = await api.get("/auth/user", { 
      withCredentials: true,
      headers: {
        // Explicitly pass cookie if needed
        Cookie: document.cookie
      }
    });
    
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    console.error("Load User Error:", error);
    console.error("Error Response:", error.response?.data);
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.post("/auth/logout");

    dispatch({ type: "LogoutSuccess" });
  } catch (error) {
    dispatch({
      type: "LogoutFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

