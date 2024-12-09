import api from "@/utils/server";

// Helper to extract error message
const getErrorMessage = (error) => error.response?.data?.message || 'An error occurred';

// Dispatch action with error or success messages
const dispatchMessage = (dispatch, type, message) => {
  dispatch({ type, payload: message });
};

// Login Action
export const login = (loginData) => async (dispatch) => {
  dispatch({ type: 'LoadUserRequest' });
  try {
    const response = await api.post('/auth/login', loginData);

    // Ensure response.data.user exists
    if (!response.data?.user) {
      throw new Error('Unexpected response format');
    }

    dispatch({ type: 'LoadUserSuccess', payload: response.data.user });
    dispatchMessage(dispatch, 'SetSuccessMessage', 'Login successful');
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: 'LoadUserFail', payload: errorMessage });
    dispatchMessage(dispatch, 'SetErrorMessage', errorMessage);
  }
};

// Signup Action
export const signup = (formData) => async (dispatch) => {
  dispatch({ type: "SignupRequest" });
  try {
    const { data } = await api.post("/auth/signup", formData);
    dispatch({ type: "SignupSuccess", payload: data.user });
    return { type: "SignupSuccess", payload: data.user }; // Return result
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Signup failed";
    dispatch({ type: "SignupFail", payload: errorMessage });
    return { type: "SignupFail", payload: errorMessage }; // Return result
  }
};
